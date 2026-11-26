# DMC Android wrapper

This Android app packages the hosted DMC web application in an Android WebView.

- Package ID: `org.dmc.gospelworldhistory`
- Version: `1.0.0`
- Minimum Android: 6.0 (API 23)
- Website: https://dmc-gospel-world-history-4kct.vercel.app/

The GitHub Actions workflow **Build DMC Android APK** builds a debug-signed APK and uploads it as the `DMC-Android-APK` artifact. Open the repository's Actions tab, select the successful workflow run, and download the artifact. This is a sideload APK for testing/distribution, not a Play Store AAB.

The wrapper requires an internet connection to load the hosted site. The website's own PWA caching may provide some offline access after first use. A Play Store release needs a separately managed private signing key, app icon assets, and a release AAB.
