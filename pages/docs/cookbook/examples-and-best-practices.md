# Examples and Best Practices

This guide provides real-world examples and best practices for using DevTools effectively. Learn from practical patterns that developers use daily.

## Table of Contents

1. [Complete E-commerce Flow](#complete-e-commerce-flow)
2. [Authentication Patterns](#authentication-patterns)
3. [Data-Driven Testing](#data-driven-testing)
4. [Error Handling](#error-handling)
5. [Performance Testing](#performance-testing)
6. [Advanced Variable Mapping](#advanced-variable-mapping)
7. [Best Practices Summary](#best-practices-summary)

## Complete E-commerce Flow

This example demonstrates a complete e-commerce test flow with authentication, product management, and order processing.

![E‑commerce flow run (end‑to‑end)](/docs/assets/example-ecommerce-flow-run.gif)

### Scenario

Test a complete user journey:
1. Login as admin
2. Create product categories
3. Create products
4. Search for products
5. Place an order
6. Verify order status

### YAML Flow

```yaml
workspace_name: E-commerce API Tests

env:
  BASE_URL: '#env:API_BASE_URL'
  ADMIN_EMAIL: admin@example.com
  ADMIN_PASSWORD: '#env:ADMIN_PASSWORD'

run:
  - flow: AuthenticationFlow
  - flow: ProductManagementFlow
    depends_on: AuthenticationFlow
  - flow: OrderFlow
    depends_on: ProductManagementFlow

flows:
  # Authentication Flow
  - name: AuthenticationFlow
    variables:
      - name: flow_description
        value: 'Authenticate admin user and obtain access token'
    steps:
      - request:
          name: AdminLogin
          method: POST
          url: '{{BASE_URL}}/api/auth/login'
          headers:
            Content-Type: application/json
          body:
            email: '{{ADMIN_EMAIL}}'
            password: '{{ADMIN_PASSWORD}}'

      - js:
          name: ValidateToken
          code: |
            export default function(context) {
              const token = context.AdminLogin?.response?.body?.token;

              if (!token) {
                throw new Error('Authentication failed: No token received');
              }

              console.log('✅ Authentication successful');

              return {
                authenticated: true,
                tokenLength: token.length
              };
            }
          depends_on: AdminLogin

  # Product Management Flow
  - name: ProductManagementFlow
    variables:
      - name: category_name
        value: 'Electronics'
      - name: product_name
        value: 'Wireless Headphones'
      - name: product_price
        value: '99.99'
    steps:
      # Create Category
      - request:
          name: CreateCategory
          method: POST
          url: '{{BASE_URL}}/api/categories'
          headers:
            Content-Type: application/json
            Authorization: Bearer {{AdminLogin.response.body.token}}
          body:
            name: '{{category_name}}'
            description: 'Electronic devices and accessories'

      # Create Product
      - request:
          name: CreateProduct
          method: POST
          url: '{{BASE_URL}}/api/products'
          headers:
            Content-Type: application/json
            Authorization: Bearer {{AdminLogin.response.body.token}}
          body:
            name: '{{product_name}}'
            price: '{{product_price}}'
            categoryId: '{{CreateCategory.response.body.id}}'
            stock: 100
          depends_on: CreateCategory

      # Verify Product Created
      - request:
          name: GetProduct
          method: GET
          url: '{{BASE_URL}}/api/products/{{CreateProduct.response.body.id}}'
          headers:
            Authorization: Bearer {{AdminLogin.response.body.token}}
          depends_on: CreateProduct

      # Search Products
      - request:
          name: SearchProducts
          method: GET
          url: '{{BASE_URL}}/api/products/search'
          headers:
            Authorization: Bearer {{AdminLogin.response.body.token}}
          query_params:
            q: 'Wireless'
            categoryId: '{{CreateCategory.response.body.id}}'
          depends_on: CreateProduct

  # Order Flow
  - name: OrderFlow
    variables:
      - name: quantity
        value: '2'
    steps:
      # Create Order
      - request:
          name: CreateOrder
          method: POST
          url: '{{BASE_URL}}/api/orders'
          headers:
            Content-Type: application/json
            Authorization: Bearer {{AdminLogin.response.body.token}}
          body:
            items:
              - productId: '{{CreateProduct.response.body.id}}'
                quantity: '{{quantity}}'
            shippingAddress:
              street: '123 Main St'
              city: 'San Francisco'
              zipCode: '94105'

      # Verify Order
      - request:
          name: GetOrder
          method: GET
          url: '{{BASE_URL}}/api/orders/{{CreateOrder.response.body.id}}'
          headers:
            Authorization: Bearer {{AdminLogin.response.body.token}}
          depends_on: CreateOrder

      # Calculate Expected Total
      - js:
          name: VerifyOrderTotal
          code: |
            export default function(context) {
              const order = context.GetOrder?.response?.body;
              const productPrice = parseFloat(context.product_price);
              const quantity = parseInt(context.quantity);
              const expectedTotal = productPrice * quantity;

              const actualTotal = order?.total;

              if (Math.abs(actualTotal - expectedTotal) > 0.01) {
                throw new Error(
                  `Order total mismatch: expected ${expectedTotal}, got ${actualTotal}`
                );
              }

              console.log(`✅ Order total correct: $${actualTotal}`);

              return {
                verified: true,
                orderTotal: actualTotal,
                expectedTotal: expectedTotal
              };
            }
          depends_on: GetOrder
```

### Why This Flow is Powerful

**1. Authentication Chaining**: Login once, use token everywhere
```yaml
Authorization: Bearer {{AdminLogin.response.body.token}}
```

**2. Data Dependencies**: Use created category ID in product creation
```yaml
categoryId: '{{CreateCategory.response.body.id}}'
```

**3. Validation**: JavaScript nodes verify business logic
```javascript
if (Math.abs(actualTotal - expectedTotal) > 0.01) {
  throw new Error('Order total mismatch');
}
```

**4. Environment Flexibility**: Switch between dev/staging/prod
```yaml
BASE_URL: '#env:API_BASE_URL'
```

## Authentication Patterns

### Pattern 1: Bearer Token Authentication

Most common API authentication:

```yaml
flows:
  - name: BearerAuthFlow
    steps:
      - request:
          name: Login
          method: POST
          url: '{{BASE_URL}}/auth/login'
          body:
            email: '{{USER_EMAIL}}'
            password: '{{USER_PASSWORD}}'

      - request:
          name: ProtectedEndpoint
          method: GET
          url: '{{BASE_URL}}/api/protected'
          headers:
            Authorization: Bearer {{Login.response.body.token}}
```

### Pattern 2: API Key Authentication

```yaml
env:
  API_KEY: '#env:SECRET_API_KEY'

flows:
  - name: APIKeyFlow
    steps:
      - request:
          name: FetchData
          method: GET
          url: '{{BASE_URL}}/api/data'
          headers:
            X-API-Key: '{{API_KEY}}'
```

### Pattern 3: OAuth 2.0 Client Credentials

```yaml
flows:
  - name: OAuth2Flow
    variables:
      - name: client_id
        value: '#env:OAUTH_CLIENT_ID'
      - name: client_secret
        value: '#env:OAUTH_CLIENT_SECRET'
    steps:
      - request:
          name: GetAccessToken
          method: POST
          url: '{{BASE_URL}}/oauth/token'
          headers:
            Content-Type: application/x-www-form-urlencoded
          body:
            grant_type: client_credentials
            client_id: '{{client_id}}'
            client_secret: '{{client_secret}}'

      - request:
          name: CallAPI
          method: GET
          url: '{{BASE_URL}}/api/resource'
          headers:
            Authorization: Bearer {{GetAccessToken.response.body.access_token}}
```

### Pattern 4: Refresh Token Flow

```yaml
flows:
  - name: RefreshTokenFlow
    steps:
      - request:
          name: Login
          method: POST
          url: '{{BASE_URL}}/auth/login'
          body:
            email: '{{USER_EMAIL}}'
            password: '{{USER_PASSWORD}}'

      - request:
          name: RefreshToken
          method: POST
          url: '{{BASE_URL}}/auth/refresh'
          headers:
            Content-Type: application/json
          body:
            refreshToken: '{{Login.response.body.refreshToken}}'

      - request:
          name: UseNewToken
          method: GET
          url: '{{BASE_URL}}/api/profile'
          headers:
            Authorization: Bearer {{RefreshToken.response.body.accessToken}}
```

## Data-Driven Testing

### Pattern 1: Loop Through Test Data

```yaml
flows:
  - name: DataDrivenUserTest
    variables:
      - name: test_users
        value: '#file:./test-data/users.json'
    steps:
      - js:
          name: ParseUsers
          code: |
            export default function(context) {
              const users = JSON.parse(context.test_users);
              return { users };
            }

      - for_each:
          name: TestEachUser
          items: '{{ParseUsers.users}}'
          loop: CreateUser

      - request:
          name: CreateUser
          method: POST
          url: '{{BASE_URL}}/api/users'
          headers:
            Content-Type: application/json
            Authorization: Bearer {{Login.response.body.token}}
          body:
            email: '{{TestEachUser.item.email}}'
            name: '{{TestEachUser.item.name}}'
            role: '{{TestEachUser.item.role}}'
```

**test-data/users.json:**
```json
[
  { "email": "user1@example.com", "name": "Alice", "role": "admin" },
  { "email": "user2@example.com", "name": "Bob", "role": "user" },
  { "email": "user3@example.com", "name": "Charlie", "role": "user" }
]
```

### Pattern 2: Parameterized Tests

```yaml
flows:
  - name: SearchTest
    steps:
      - for_each:
          name: TestSearchQueries
          items: ['electronics', 'books', 'clothing']
          loop: SearchProducts

      - request:
          name: SearchProducts
          method: GET
          url: '{{BASE_URL}}/api/search'
          query_params:
            q: '{{TestSearchQueries.item}}'

      - js:
          name: ValidateResults
          code: |
            export default function(context) {
              const results = context.SearchProducts?.response?.body;
              const query = context.TestSearchQueries?.item;

              if (!results || results.length === 0) {
                console.log(`⚠️  No results for query: ${query}`);
              } else {
                console.log(`✅ Found ${results.length} results for: ${query}`);
              }

              return { resultsCount: results?.length || 0 };
            }
          depends_on: SearchProducts
```

## Error Handling

### Pattern 1: Conditional Error Handling

```yaml
flows:
  - name: RobustAPITest
    steps:
      - request:
          name: FetchData
          method: GET
          url: '{{BASE_URL}}/api/data'

      - if:
          name: CheckResponse
          condition: FetchData.response.status == 200
          then: ProcessData
          else: HandleError

      - js:
          name: ProcessData
          code: |
            export default function(context) {
              const data = context.FetchData?.response?.body;
              console.log('✅ Data fetched successfully');
              return { processed: true, recordCount: data.length };
            }

      - js:
          name: HandleError
          code: |
            export default function(context) {
              const status = context.FetchData?.response?.status;
              const body = context.FetchData?.response?.body;

              console.error(`❌ Request failed with status: ${status}`);
              console.error('Response:', JSON.stringify(body, null, 2));

              return {
                error: true,
                status: status,
                message: body?.message || 'Unknown error'
              };
            }
```

### Pattern 2: Retry Logic

```yaml
flows:
  - name: RetryFlow
    variables:
      - name: max_retries
        value: '3'
    steps:
      - for:
          name: RetryLoop
          iter_count: '{{max_retries}}'
          loop: AttemptRequest
          break_condition: AttemptRequest.response.status == 200

      - request:
          name: AttemptRequest
          method: GET
          url: '{{BASE_URL}}/api/unstable-endpoint'

      - js:
          name: CheckSuccess
          code: |
            export default function(context) {
              const status = context.AttemptRequest?.response?.status;
              const attempt = context.RetryLoop?.index || 0;

              if (status === 200) {
                console.log(`✅ Success on attempt ${attempt + 1}`);
                return { success: true, attempts: attempt + 1 };
              } else {
                console.log(`⚠️  Failed attempt ${attempt + 1}, status: ${status}`);
                return { success: false, attempts: attempt + 1 };
              }
            }
          depends_on: AttemptRequest
```

### Pattern 3: Graceful Degradation

```yaml
flows:
  - name: GracefulDegradation
    steps:
      - request:
          name: FetchPrimaryAPI
          method: GET
          url: '{{PRIMARY_API_URL}}/data'

      - if:
          name: CheckPrimary
          condition: FetchPrimaryAPI.response.status >= 500
          then: UseFallback
          else: UsePrimary

      - js:
          name: UsePrimary
          code: |
            export default function(context) {
              return {
                data: context.FetchPrimaryAPI.response.body,
                source: 'primary'
              };
            }

      - request:
          name: FetchFallbackAPI
          method: GET
          url: '{{FALLBACK_API_URL}}/data'

      - js:
          name: UseFallback
          code: |
            export default function(context) {
              console.log('⚠️  Using fallback API due to primary failure');
              return {
                data: context.FetchFallbackAPI.response.body,
                source: 'fallback'
              };
            }
          depends_on: FetchFallbackAPI
```

## Performance Testing

### Pattern 1: Load Testing with Loops

```yaml
flows:
  - name: LoadTest
    variables:
      - name: concurrent_users
        value: '10'
      - name: requests_per_user
        value: '5'
    steps:
      - for:
          name: SimulateUsers
          iter_count: '{{concurrent_users}}'
          loop: UserRequests

      - for:
          name: UserRequests
          iter_count: '{{requests_per_user}}'
          loop: MakeRequest

      - request:
          name: MakeRequest
          method: GET
          url: '{{BASE_URL}}/api/products/{{UserRequests.index}}'

      - js:
          name: CalculateMetrics
          code: |
            export default function(context) {
              const duration = context.MakeRequest?.response?.duration;
              console.log(`Request ${context.UserRequests.index} completed in ${duration}ms`);
              return { duration };
            }
          depends_on: MakeRequest
```

### Pattern 2: Response Time Validation

```yaml
flows:
  - name: PerformanceTest
    variables:
      - name: max_response_time
        value: '500'  # milliseconds
    steps:
      - request:
          name: FetchData
          method: GET
          url: '{{BASE_URL}}/api/data'

      - js:
          name: ValidateResponseTime
          code: |
            export default function(context) {
              const duration = context.FetchData?.response?.duration;
              const maxTime = parseInt(context.max_response_time);

              if (duration > maxTime) {
                throw new Error(
                  `Response time ${duration}ms exceeds limit of ${maxTime}ms`
                );
              }

              console.log(`✅ Response time: ${duration}ms (within ${maxTime}ms limit)`);

              return {
                passed: true,
                duration: duration,
                limit: maxTime
              };
            }
          depends_on: FetchData
```

## Advanced Variable Mapping

### Why Variable Mapping is Powerful

DevTools' variable system enables sophisticated data flow patterns:

**1. Automatic Dependency Detection**
```
Login → Extract token → Use in all subsequent requests
```

**2. Cross-Request Data Flow**
```
CreateUser → Get user ID → Update user → Delete user
```

**3. Environment Portability**
```
Dev:     BASE_URL = http://localhost:3000
Staging: BASE_URL = https://api-staging.example.com
Prod:    BASE_URL = https://api.example.com
```

**4. Complex Transformations**
```javascript
// Extract nested data
{{GetOrder.response.body.items[0].product.id}}

// Transform with JavaScript
export default function(context) {
  const users = context.GetUsers.response.body;
  return {
    adminUsers: users.filter(u => u.role === 'admin'),
    activeUsers: users.filter(u => u.active)
  };
}
```

### Pattern 1: Chain Multiple Requests

```yaml
flows:
  - name: UserLifecycleTest
    steps:
      # Create
      - request:
          name: CreateUser
          method: POST
          url: '{{BASE_URL}}/api/users'
          body:
            email: test@example.com
            name: Test User

      # Read
      - request:
          name: GetUser
          method: GET
          url: '{{BASE_URL}}/api/users/{{CreateUser.response.body.id}}'
          depends_on: CreateUser

      # Update
      - request:
          name: UpdateUser
          method: PUT
          url: '{{BASE_URL}}/api/users/{{CreateUser.response.body.id}}'
          body:
            name: Updated Name
          depends_on: GetUser

      # Verify Update
      - request:
          name: VerifyUpdate
          method: GET
          url: '{{BASE_URL}}/api/users/{{CreateUser.response.body.id}}'
          depends_on: UpdateUser

      # Delete
      - request:
          name: DeleteUser
          method: DELETE
          url: '{{BASE_URL}}/api/users/{{CreateUser.response.body.id}}'
          depends_on: VerifyUpdate
```

### Pattern 2: Extract and Transform Data

```yaml
flows:
  - name: DataTransformation
    steps:
      - request:
          name: FetchOrders
          method: GET
          url: '{{BASE_URL}}/api/orders'

      - js:
          name: ProcessOrders
          code: |
            export default function(context) {
              const orders = context.FetchOrders?.response?.body || [];

              // Calculate statistics
              const total = orders.reduce((sum, o) => sum + o.total, 0);
              const avgOrder = total / orders.length;

              // Extract IDs
              const orderIds = orders.map(o => o.id);
              const userIds = [...new Set(orders.map(o => o.userId))];

              return {
                orderCount: orders.length,
                totalRevenue: total,
                averageOrder: avgOrder,
                orderIds: orderIds,
                uniqueUsers: userIds.length
              };
            }
          depends_on: FetchOrders

      # Use transformed data
      - for_each:
          name: ProcessEachOrder
          items: '{{ProcessOrders.orderIds}}'
          loop: GetOrderDetails

      - request:
          name: GetOrderDetails
          method: GET
          url: '{{BASE_URL}}/api/orders/{{ProcessEachOrder.item}}'
```

### Pattern 3: Dynamic URL Construction

```yaml
flows:
  - name: DynamicURLs
    variables:
      - name: api_version
        value: 'v2'
      - name: resource_type
        value: 'users'
    steps:
      - request:
          name: FetchResource
          method: GET
          url: '{{BASE_URL}}/api/{{api_version}}/{{resource_type}}'

      - js:
          name: BuildNestedURL
          code: |
            export default function(context) {
              const firstUser = context.FetchResource?.response?.body?.[0];
              return {
                userId: firstUser.id,
                endpoint: `users/${firstUser.id}/posts`
              };
            }
          depends_on: FetchResource

      - request:
          name: FetchUserPosts
          method: GET
          url: '{{BASE_URL}}/api/{{api_version}}/{{BuildNestedURL.endpoint}}'
```

## Best Practices Summary

### 1. Flow Organization

✅ **Do:**
- Separate flows by feature/domain
- Use descriptive flow and node names
- Group related tests together
- Keep flows focused (single responsibility)

❌ **Don't:**
- Create monolithic flows with 50+ nodes
- Use generic names (Request1, Request2)
- Mix unrelated tests in one flow

### 2. Variable Management

✅ **Do:**
- Use environment variables for config
- Reference node outputs directly
- Document sensitive variables
- Use `#env:` for secrets

❌ **Don't:**
- Hardcode URLs, API keys, or credentials
- Duplicate variable definitions
- Commit secrets to version control

### 3. Error Handling

✅ **Do:**
- Add condition nodes for critical paths
- Validate responses in JavaScript nodes
- Use meaningful error messages
- Implement retry logic for flaky endpoints

❌ **Don't:**
- Assume all requests succeed
- Ignore error status codes
- Let flows fail silently

### 4. Maintainability

✅ **Do:**
- Use request templates for reusability
- Add comments in JavaScript nodes
- Keep YAML files in version control
- Document complex flows

❌ **Don't:**
- Copy-paste request configurations
- Write undocumented complex logic
- Store flows only in Desktop app

### 5. Performance

✅ **Do:**
- Enable parallel execution when possible
- Set appropriate timeouts
- Use pagination for large datasets
- Cache authentication tokens

❌ **Don't:**
- Fetch all data in one request
- Create unnecessary dependencies
- Ignore performance metrics

### 6. Testing Strategy

✅ **Do:**
- Write smoke tests (fast, critical paths)
- Add regression tests (comprehensive coverage)
- Test happy paths AND error cases
- Validate business logic, not just status codes

❌ **Don't:**
- Test only success scenarios
- Skip edge cases
- Ignore error responses

### 7. CI/CD Integration

✅ **Do:**
- Generate JUnit reports
- Use environment-specific configurations
- Run smoke tests on every commit
- Archive test results

❌ **Don't:**
- Skip tests in CI
- Use production data in tests
- Ignore test failures

### 8. Documentation

✅ **Do:**
- Document variable purposes
- Explain complex transformations
- Add flow descriptions
- Share examples with team

❌ **Don't:**
- Assume others understand your flows
- Skip descriptions
- Leave cryptic variable names

---

## Next Steps

You now have a complete understanding of DevTools! Here's what to do next:

1. **Start Small**: Create a simple flow for your API
2. **Import Existing Tests**: Import HAR files from browser recordings
3. **Add to CI/CD**: Integrate with your pipeline
4. **Iterate**: Gradually add more sophisticated tests
5. **Share**: Help your team adopt DevTools

## Additional Resources

- **GitHub Repository**: [github.com/the-dev-tools/dev-tools](https://github.com/the-dev-tools/dev-tools)
- **CLI Demo**: [github.com/the-dev-tools/cli-demo](https://github.com/the-dev-tools/cli-demo)
- **Issue Tracker**: Report bugs or request features
- **Community**: Join discussions and share your flows

Happy testing! 🚀
