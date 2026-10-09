CLEARCV — FREE RESUME BUILDER V1.1 (VISUAL UPGRADE)
================================

WHAT IS INCLUDED
- Responsive resume builder for desktop, tablet, and mobile
- Refreshed, premium-style visual design with responsive hero and editor panels
- Visual template picker with miniature previews for all 10 resume styles
- 10 visual templates
- Live preview
- Personal details, summary, skills, projects, certifications
- Add/remove work experience and education entries
- Saves draft in the current browser using localStorage
- Print / Save as PDF through your browser (no paid API)
- No account, database, paid API, subscription, or custom domain required

FILES
- index.html: page structure and form
- style.css: design, responsive layout, 10 template styles, print styles
- script.js: editor, live preview, browser saving, and print/PDF action

RUN ON WINDOWS (EASIEST)
1. Download and extract the ZIP file to a folder such as Desktop\free_resume_builder_v1.
2. Open the extracted folder.
3. Double-click index.html. It should open in your default browser.
4. Enter sample details, add/remove education or experience, and choose templates.
5. Click "Download PDF". In the browser print dialog:
   - Destination/Printer: Save as PDF (or Microsoft Print to PDF)
   - Paper size: A4
   - Turn on "Background graphics" if you want template background colors.
   - Save the file.
6. If double-clicking does not work, open Chrome or Edge, press Ctrl+O, and choose index.html.

IMPORTANT PDF NOTE
The PDF is produced by the browser's built-in print-to-PDF feature. The browser print dialog opens; the user chooses Save as PDF. This avoids paid PDF services. For the best result use Chrome or Edge, paper A4, scale 100%, margins None or Default depending on the preview, and Background graphics enabled. Review the print preview before saving.

FREE HOSTING OPTION A: GITHUB PAGES
1. Create a free account at https://github.com/
2. Create a new public repository, for example "clearcv-resume-builder".
3. Upload index.html, style.css, and script.js to the repository root.
4. Open repository Settings > Pages.
5. Under Build and deployment, choose "Deploy from a branch".
6. Choose branch "main" and folder "/ (root)", then Save.
7. Wait for the Pages URL to appear. It normally resembles:
   https://YOUR-USERNAME.github.io/clearcv-resume-builder/
8. Open that URL and test all features.
GitHub Pages availability and terms may change; check the current GitHub Pages documentation.

FREE HOSTING OPTION B: CLOUDFLARE PAGES
1. Create a free Cloudflare account at https://dash.cloudflare.com/
2. Go to Workers & Pages / Pages and create a project.
3. Connect the GitHub repository or use the current supported direct-upload flow.
4. For this plain HTML/CSS/JS site, no build command is needed; set the output directory to the folder containing index.html (often the repository root).
5. Deploy and test the supplied pages.dev URL.
Free plan details and dashboard labels can change.

BEFORE PUBLISHING
- Change the title/branding if desired.
- Test every template and the PDF output in current Chrome and Edge.
- Add your own privacy policy and contact/about pages if you publish publicly.
- Do not add a database or analytics until you need them.
- Never claim a resume is guaranteed to pass every ATS. This is a starter tool; different applicant-tracking systems parse documents differently.
- localStorage is only on the same browser/device. It is not cloud backup. Clearing browser data can remove drafts.
- Do not enter highly sensitive information unless comfortable storing it in that browser.

SEO STARTER
- The HTML includes a title and meta description.
- Before launching, write unique helpful content explaining how to create a resume, fresher resume tips, and how each template is useful.
- Keep pages useful and fast. Do not create dozens of nearly identical pages just to target keywords.
- Register the live site with Google Search Console after publishing and submit a sitemap if you create one.
- Search traffic and rankings are not guaranteed and may take time.

VERSION 1 LIMITATIONS
- English interface only.
- The preview is a single-page visual preview; longer content may print to more than one page.
- No AI writing, cloud accounts, online database, file upload, profile photo, or custom domain included.
- The fonts use Google Fonts when internet access is available; system fallback fonts work offline.
