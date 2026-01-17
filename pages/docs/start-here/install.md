# Getting Started with DevTools

This guide will help you install DevTools and create your first API test in minutes.

## Installation

DevTools is available in two formats: Desktop Application and CLI Tool.

### Desktop Application

Download the desktop app for your platform from the [releases page](https://github.com/the-dev-tools/dev-tools/releases):

**macOS:**
```bash
# Download the .dmg file
DevTools-{version}-darwin-{arch}.dmg

# Open and drag to Applications folder
```

**Windows:**
```bash
# Download and run the installer
DevTools-{version}-win32-{arch}.exe
```

**Linux:**
```bash
# Download the AppImage
DevTools-{version}-linux-{arch}.AppImage

# Make it executable and run
chmod +x DevTools-{version}-linux-{arch}.AppImage
./DevTools-{version}-linux-{arch}.AppImage
```

### CLI Tool

The CLI is perfect for CI/CD pipelines and headless automation.

**Quick Install (macOS/Linux):**
```bash
curl -fsSL https://sh.dev.tools/install.sh | bash
```

**With wget:**
```bash
wget -qO- https://sh.dev.tools/install.sh | bash
```

**Custom Install Directory:**
```bash
INSTALL_DIR=/opt/devtools curl -fsSL https://sh.dev.tools/install.sh | bash
```

**Manual Installation:**

Download the binary for your platform from the [releases page](https://github.com/the-dev-tools/dev-tools/releases) and add it to your PATH.

**Verify Installation:**
```bash
devtools version
# Output: DevToolsCLI v0.5.1
```

## Your First Workspace

### 1. Create a Workspace

When you first open DevTools Desktop:

1. Click **"New Workspace"**
2. Give it a name (e.g., "My API Tests")
3. Click **Create**

Your workspace is now ready to organize your API requests and flows.

![New Workspace modal and empty workspace](/docs/assets/devtools-new-workspace-modal.webp)

### 2. Create Your First Request

Let's create a simple API request:

1. Click **"New Request"** in the sidebar
2. Configure the request:
   - **Method**: GET
   - **URL**: `https://jsonplaceholder.typicode.com/users/1`
   - **Name**: GetUser
3. Click **Send**

You should see a successful response with user data in JSON format.

![Create a new HTTP request from the Files sidebar](/docs/assets/sidebar-new-http-request-menu.webp)

![First request to jsonplaceholder users/1 showing a 200 JSON response](/docs/assets/first-request-jsonplaceholder-users-1.webp)

<video autoplay loop muted playsinline style="max-width: 100%; height: auto;" aria-label="Typing the URL, clicking Send, and seeing the response">
  <source src="/docs/assets/first-request-send-and-response.webm" type="video/webm" />
  <source src="/docs/assets/first-request-send-and-response.mp4" type="video/mp4" />
</video>

### 3. Save and Organize

DevTools automatically saves your request. You can:
- Organize requests into folders by domain
- Add descriptions and tags
- Group related requests into collections

## Quick Tour: Key Features

### Request Editor

The request editor provides a familiar interface similar to Postman:

- **URL Builder**: Enter your endpoint with autocomplete support
- **Headers Tab**: Add custom headers (Authorization, Content-Type, etc.)
- **Body Tab**: Support for JSON, form data, raw text, and binary
- **Query Params Tab**: Build query strings visually
- **Tests Tab**: Add response assertions

<video autoplay loop muted playsinline style="max-width: 100%; height: auto;" aria-label="Annotated request editor UI">
  <source src="/docs/assets/request-editor-annotated.webm" type="video/webm" />
  <source src="/docs/assets/request-editor-annotated.mp4" type="video/mp4" />
</video>

### Response Viewer

After sending a request:
- **Body**: View formatted JSON, XML, HTML, or raw text
- **Headers**: Inspect response headers
- **Status**: HTTP status code and response time
- **Variables**: See extracted variables (when using flows)

## Next Steps

Now that you have DevTools installed and understand the basics:

1. **Import Real Requests**: Learn how to [import HAR files](./02-importing-har-files.md) from browser recordings
2. **Create Flows**: Build visual test workflows with the [Flow Builder](./03-working-with-flows.md)
3. **Manage Environments**: Set up [environments and variables](./04-environments-and-variables.md) for different configurations
4. **Automate Tests**: Integrate with CI/CD using the [CLI tool](./05-cli-tool.md)

## Common First-Time Questions

### Where is my data stored?

All data is stored **locally** on your machine:
- Desktop: SQLite database in your user data directory
- CLI: In-memory database (ephemeral) or specified workspace file

**No data is sent to external servers.**

### What formats can I import?

DevTools supports:
- HAR files (HTTP Archive)
- cURL commands
- OpenAPI/Swagger specs (coming soon)

See [Importing HAR Files](./02-importing-har-files.md) for details.

### Does DevTools support authentication?

Yes, DevTools supports all standard authentication methods:
- Bearer tokens
- Basic Auth
- API keys (header or query param)
- OAuth 2.0 (via variable substitution)
- Custom authentication schemes

### Can I use DevTools in my CI/CD pipeline?

Absolutely! The CLI tool is designed for CI/CD integration. See [CI/CD Integration](./06-cicd-integration.md) for examples with GitHub Actions, GitLab CI, Jenkins, and more.

### Is DevTools free?

Yes, DevTools is **source-available** and free to use. The source code is available on [GitHub](https://github.com/the-dev-tools/dev-tools).

---

**Ready to import real API requests?** Continue to [Importing HAR Files](./02-importing-har-files.md).
