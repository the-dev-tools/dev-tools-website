# Visual Content TODO List

This document lists all missing images and videos across the dev-tools-website. Items are organized by page with specific recommendations for images vs. videos.

---

## 🔴 HIGH PRIORITY - Guides (Explicit TODOs Found)

### `/guides/migrate-from-postman` (page.tsx)

**Line 22:** Hero section needs migration flow diagram
- [ ] **IMAGE**: Add hero screenshot showing Postman export → DevTools import workflow
- Type: Screenshot/diagram showing before/after or side-by-side comparison
- Purpose: Give users immediate visual of migration process

**Line 110:** Diagram for migration paths
- [ ] **IMAGE**: Add diagram showing Postman collection export vs HAR import paths
- Type: Flowchart/decision diagram
- Purpose: Help users choose between exporting collections vs recording fresh HAR

**Line 163:** Environment variable mapping screenshot
- [ ] **IMAGE**: Screenshot of Postman environment variables being mapped to DevTools
- Type: Side-by-side or annotated screenshot
- Purpose: Show how to translate Postman env vars to DevTools format

**Line 178:** Postman export dialog
- [ ] **IMAGE**: Screenshot of Postman export dialog (Collection v2.1 selection)
- Purpose: Show exact steps for exporting from Postman

**Line 196:** Download page screenshot
- [ ] **IMAGE**: Screenshot of DevTools Studio download page
- Purpose: Familiarize users with download interface

**Line 233:** HAR recording demonstration
- [ ] **VIDEO**: Video/GIF of HAR recording process in Chrome
- Type: Short screencast (15-30 seconds)
- Purpose: Show the complete HAR capture workflow
- Details: Chrome DevTools → Network → Perform workflow → Save HAR

**Line 249:** Variable mapping panel
- [ ] **IMAGE**: Screenshot of variable mapping panel in DevTools Studio
- Purpose: Show how auto-detected variables work

**Line 284:** Export dialog
- [ ] **IMAGE**: Screenshot of Studio export dialog
- Purpose: Show YAML export interface

---

### `/guides/newman-alternative-ci` (page.tsx)

**Line 75-76:** CI workflow videos
- [ ] **VIDEO** (`ci-pass.mp4`): GitHub Actions run → green check → results.xml artifact
- Type: Screen recording (30-60 seconds)
- Purpose: Show successful CI run with test results
- Details: Show the workflow triggering, running, passing, and artifact being created

- [ ] **VIDEO** (`reports.mp4`): Terminal showing two --report outputs then ls
- Type: Terminal recording (15-30 seconds)
- Purpose: Demonstrate running CLI with both JSON and JUnit output
- Details: Show command execution, both reports being generated, and ls showing the files

**Line 94:** Install and verify screenshot
- [ ] **IMAGE** (`/public/media/newman-alternative-ci-install-verify.png`): CLI installation and version verification
- Purpose: Show successful local installation

**Line 157:** JUnit artifact screenshot
- [ ] **IMAGE** (`/public/media/newman-alternative-ci-junit-artifact.png`): GitHub Actions uploading JUnit XML test results
- Purpose: Show artifact upload in Actions UI

**Line 169-173:** CI pass video (embedded)
- [ ] **VIDEO** (`/public/media/ci-pass.mp4`): CI run passing + artifact
- Type: Screen recording embedded in page
- Purpose: Show complete CI workflow success

**Line 210:** YAML environment variables screenshot
- [ ] **IMAGE** (`/public/media/newman-alternative-ci-yaml-envvars.png`): YAML API test flow using #env variables
- Purpose: Show correct syntax for referencing CI secrets

**Line 245-249:** Reports video (embedded)
- [ ] **VIDEO** (`/public/media/reports.mp4`): Local run producing JSON + JUnit
- Type: Terminal recording embedded in page
- Purpose: Show dual report generation locally

---

### `/guides/generate-har-chrome` (page.jsx)

**Line 67:** Chrome Network tab screenshot
- [ ] **IMAGE** (`/media/chrome-network-tab.png`): Chrome DevTools Network tab open
- Purpose: Show where to find Network panel

**Line 84:** Allow HAR with sensitive data setting
- [ ] **IMAGE** (`/media/chrome-allow-har-sensitive-data.png`): Chrome setting 'Allow to generate HAR with sensitive data' enabled
- Purpose: Show critical setting for capturing request bodies

**Line 103:** Preserve log and clear demonstration
- [ ] **GIF/VIDEO** (`/media/chrome-preserve-log-clear.gif`): Chrome Network: Preserve log and Clear, then capturing a user flow
- Type: Animated GIF or short video (20-30 seconds)
- Purpose: Show the workflow of starting a clean recording
- Details: Check Preserve log → Click Clear → Perform actions → Requests populate

**Line 121:** Save HAR with content menu
- [ ] **IMAGE** (`/media/chrome-save-har-with-content.png`): Right-click menu 'Save all as HAR with content' in Chrome Network
- Purpose: Show exact menu option to use

**Line 158-164:** HAR import filtering screenshots
- [ ] **IMAGE** (`/media/devtools-import-har-domain-filter.png`): DevTools import HAR: domain filter checklist
- Purpose: Show domain filtering interface

- [ ] **IMAGE** (`/media/devtools-domain-to-variable.png`): Map domain to {{BASE_URL}} variable in DevTools
- Purpose: Show variable mapping for domains

**Line 176:** Flow dependencies visualization
- [ ] **IMAGE** (`/media/devtools-flow-dependencies.png`): DevTools flow dependencies visual with token chaining
- Purpose: Show auto-detected dependencies between requests

**Line 192-199:** Export and Git diff screenshots
- [ ] **IMAGE** (`/media/devtools-export-yaml.png`): Export flow to YAML in DevTools
- Purpose: Show export interface

- [ ] **IMAGE** (`/media/git-diff-yaml-flow.png`): PR diff showing readable YAML flow changes
- Purpose: Demonstrate reviewability of YAML flows in Git

---

## 🟡 MEDIUM PRIORITY - Templates

### `/templates/github-actions` (page.tsx)

**Line 40-45:** Template demonstration visuals
- [ ] **IMAGE**: Screenshot of PR checks showing JUnit summary
- Purpose: Show test results integrated in GitHub PR UI
- Details: Should show passing/failing tests in the Checks tab

- [ ] **VIDEO**: Short clip of workflow logs highlighting `devtools` output
- Type: Screen recording (15-20 seconds)
- Purpose: Show what the workflow output looks like when running

---

### `/templates/gitlab-ci` (page.tsx)

**Line 42-46:** Template demonstration visuals
- [ ] **IMAGE**: Screenshot of pipeline summary with test results
- Purpose: Show test results in GitLab pipeline UI

- [ ] **VIDEO**: Clip of job log showing `devtools` output
- Type: Screen recording (15-20 seconds)
- Purpose: Show what the job output looks like when running

---

## 🟢 LOWER PRIORITY - Enhancement Opportunities

### Main Pages (Could Benefit from Visuals)

#### `/pricing` (page.tsx)
- [ ] **IMAGE**: Optional - Diagram showing Free vs Enterprise feature comparison
- Type: Visual comparison chart or infographic
- Purpose: Make feature differences more digestible at a glance

#### `/enterprise` (page.tsx)
- [ ] **IMAGE**: Optional - Architecture diagram showing SSO/SCIM integration
- Type: Technical diagram
- Purpose: Help enterprise buyers understand security architecture

- [ ] **IMAGE**: Optional - Screenshot of audit logs interface
- Purpose: Show enterprise features in action

#### `/flows` (page.tsx)
- Status: ✅ Good - Uses the Flows component which has images
- No action needed

#### `/studio` (page.tsx)
- Status: ✅ Good - Has main screenshot
- No action needed

#### `/cli` (page.tsx)
- Status: ✅ Good - Has code examples
- Optional enhancement:
- [ ] **VIDEO**: Optional - Terminal recording showing CLI in action
- Type: Asciinema recording or MP4
- Purpose: Make CLI usage more tangible

---

### Comparison Pages

#### `/postman-alternative` (page.tsx)
- [ ] **IMAGE**: Optional - Side-by-side workflow comparison
- Type: Diagram or annotated screenshots
- Purpose: Visual comparison of DevTools vs Postman workflow

#### `/bruno-alternative` (page.tsx)
- [ ] **IMAGE**: Optional - Feature comparison visualization
- Purpose: Make differences clearer at a glance

---

### Documentation Pages

#### `/docs/how-to/import-har.md`
- Status: ✅ Good - Has comprehensive screenshots
- Images already exist at documented paths

#### `/docs/how-to/working-with-flows.md`
- Has video placeholder (lines 35-38):
- [ ] **VIDEO**: Create or verify video exists at `/docs/assets/flow-build-connect-run.webm` and `.mp4`
- Type: Screen recording showing drag, connect, configure, run workflow
- Purpose: Show flow creation process in action

---

### Blog Posts

#### `/content/blog/introducing-devtools.mdx`
- [ ] **IMAGE**: Optional - Hero image or product screenshot
- Purpose: Make blog post more engaging
- Suggestion: Screenshot of Studio interface or flow visualization

#### `/content/blog/github-flow-explained-for-api-testing-teams.mdx`
- [ ] **IMAGE**: Optional - Diagrams explaining GitHub flow concepts
- Purpose: Visual aid for explaining workflows
- Suggestion: Flowcharts or process diagrams

---

## 📊 Summary Statistics

**Total Visual Content Needed:**
- **Images**: ~29 items (17 high priority, 12 medium/low priority)
- **Videos**: ~6 items (5 high priority, 1 low priority)

**By Priority:**
- 🔴 **High Priority**: 22 items (guides with explicit TODOs)
- 🟡 **Medium Priority**: 4 items (templates)
- 🟢 **Low Priority**: 9 items (optional enhancements)

---

## 💡 Recommendations

### Images vs Videos Decision Matrix

**Use IMAGES for:**
- ✅ UI screenshots (settings, dialogs, menus)
- ✅ Code examples and diffs
- ✅ Architecture diagrams
- ✅ Feature comparisons
- ✅ Static step-by-step guides

**Use VIDEOS for:**
- ✅ Workflows that involve multiple steps (HAR recording)
- ✅ CI/CD pipeline demonstrations (runs, artifacts)
- ✅ Terminal/CLI demonstrations (command execution)
- ✅ Interactive features (drag-and-drop, flow building)
- ✅ Anything where motion adds clarity

### Production Guidelines

**For Screenshots:**
- Use consistent browser/OS theme (preferably dark mode to match site)
- Annotate important UI elements with arrows/highlights
- Keep resolution high but optimize for web (WebP format)
- Show realistic but non-sensitive data

**For Videos:**
- Keep under 30 seconds when possible
- Export as both WebM and MP4 for browser compatibility
- Include both video and GIF versions where embedded
- Use smooth recording (60fps if possible)
- Add subtle highlights/annotations if needed
- No audio needed for most technical demos

**File Organization:**
- Place guide-specific media in `/public/media/`
- Place docs assets in `/docs/assets/`
- Use descriptive, kebab-case filenames
- Consider subdirectories for organization (e.g., `/media/guides/`, `/media/templates/`)

---

## 🎯 Suggested Implementation Order

1. **Week 1**: High-priority guide images (HAR Chrome guide, Newman alternative)
2. **Week 2**: High-priority guide videos (CI demonstrations, HAR recording)
3. **Week 3**: Migration guide visuals (Postman migration path)
4. **Week 4**: Template screenshots (GitHub Actions, GitLab CI)
5. **Week 5**: Optional enhancements (comparison pages, blog posts)

This phased approach ensures the most critical user-facing content gets visual support first.
