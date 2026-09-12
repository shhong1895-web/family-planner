Family Planner Build 102

Build 101 follow-up fixes:
1. Parent/child screens: restore tinted progress-card backgrounds/text on Shared and School tabs. Build 100/101 generic iOS CSS forced all progress-card backgrounds to white, causing white text to appear missing.
2. Welcome family photo: CSS background shorthand with !important was overriding the inline background-image, so the saved photo was not visible even with one photo. Changed to background-color and refresh welcome overlay when the familyPhotos snapshot arrives.
3. No Firestore schema/data migration. Existing collections and data remain unchanged.
