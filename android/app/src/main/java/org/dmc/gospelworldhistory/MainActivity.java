package org.dmc.gospelworldhistory;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebSettings;
import android.graphics.Color;
import android.content.SharedPreferences;
import org.json.JSONTokener;

public class MainActivity extends Activity {
    private static final String OLD_URL = "https://dmc-gospel-world-history-4kct.vercel.app/";
    private static final String NEW_URL = "https://dmc-gospel-world-history.vercel.app/";
    private static final String PREFS = "dmc_web_migration";
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setStatusBarColor(Color.rgb(18, 59, 50));
        getWindow().setNavigationBarColor(Color.rgb(18, 59, 50));
        webView = new WebView(this);
        webView.setBackgroundColor(Color.rgb(246, 244, 237));
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setLoadsImagesAutomatically(true);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                SharedPreferences prefs = getSharedPreferences(PREFS, MODE_PRIVATE);
                boolean migrated = prefs.getBoolean("migration_applied", false);
                if (!migrated && url.startsWith(OLD_URL)) {
                    // Copy every localStorage key/value from the previous app origin before switching domains.
                    view.evaluateJavascript("(function(){var o={};for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);o[k]=localStorage.getItem(k);}return JSON.stringify(o);})()", value -> {
                        try {
                            Object decoded = new JSONTokener(value).nextValue();
                            String json = decoded instanceof String ? (String) decoded : "{}";
                            prefs.edit().putString("legacy_local_storage", json).apply();
                        } catch (Exception ignored) {
                            prefs.edit().putString("legacy_local_storage", "{}").apply();
                        }
                        view.loadUrl(NEW_URL);
                    });
                } else if (!migrated && url.startsWith(NEW_URL)) {
                    String backup = prefs.getString("legacy_local_storage", null);
                    if (backup != null) {
                        String script = "(function(data){Object.keys(data).forEach(function(k){if(localStorage.getItem(k)===null){localStorage.setItem(k,String(data[k]));}});return true;})(" + backup + ")";
                        view.evaluateJavascript(script, result -> {
                            prefs.edit().remove("legacy_local_storage").putBoolean("migration_applied", true).apply();
                            view.reload();
                        });
                    }
                }
            }
        });
        setContentView(webView);
        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState);
        } else {
            SharedPreferences prefs = getSharedPreferences(PREFS, MODE_PRIVATE);
            if (prefs.getBoolean("migration_applied", false)) webView.loadUrl(NEW_URL);
            else webView.loadUrl(OLD_URL);
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        if (webView != null) webView.saveState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }
}
