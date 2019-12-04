package com.adobe.aem.guides.wkndevents.core.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.engine.EngineConstants;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Filter component for adding the required HTTP headers to requested service worker files
 */
@Component(
    service = Filter.class,
    property = { EngineConstants.SLING_FILTER_SCOPE + "=" + EngineConstants.FILTER_SCOPE_REQUEST,
    // TODO: Use `EngineConstants.SLING_FILTER_SUFFIX_PATTERN` when using Sling engine 2.7+
    "sling.filter.suffix.pattern=.*/service-worker.js" // Only apply filter to files named "service-worker.js"
})
public class ServiceWorkerHeaderFilter implements Filter {

    private static final String SW_HEADER_NAME = "Service-Worker-Allowed";

    private static final String SW_SCOPE_ROOT = "/";

    private static final Logger LOG = LoggerFactory.getLogger(ServiceWorkerHeaderFilter.class);

    @Override
    public void init(FilterConfig filterConfig) {
        // Called when the Filter is initially registered
    }

    /**
     * Adds a "Service-Worker-Allowed" header to the responses for service worker files. The value of the header is the root path of the AEM
     * instance (because the service worker needs to be able to intercept/cache requests to resources which are in that directory or one of
     * its child directories)
     *
     * @param servletRequest  The HTTP request for the service worker file
     * @param servletResponse The HTTP response with the service worker file
     * @param filterChain     Invocation chain of the filtered request
     */
    @Override
    public void doFilter(final ServletRequest servletRequest, final ServletResponse servletResponse, final FilterChain filterChain)
            throws IOException, ServletException {
        final SlingHttpServletRequest slingRequest = (SlingHttpServletRequest) servletRequest;
        final SlingHttpServletResponse slingResponse = (SlingHttpServletResponse) servletResponse;

        // Add "Service-Worker-Allowed" header to response with value of service worker scope
        LOG.error("Adding \"{}\" header to response for URL {}", SW_HEADER_NAME, slingRequest.getRequestURL());
        slingResponse.addHeader(SW_HEADER_NAME, SW_SCOPE_ROOT);

        // Send request and modified response down the Felix Filter and Sling processing chain
        filterChain.doFilter(slingRequest, slingResponse);
    }

    @Override
    public void destroy() {
        // Called when the Filter is unloaded
    }
}
