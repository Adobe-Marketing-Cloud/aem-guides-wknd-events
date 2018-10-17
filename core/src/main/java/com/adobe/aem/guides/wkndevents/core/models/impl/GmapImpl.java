package com.adobe.aem.guides.wkndevents.core.models.impl;

import com.adobe.aem.guides.wkndevents.core.models.Gmap;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.wcm.api.designer.Style;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.*;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(
    adaptables = SlingHttpServletRequest.class, 
    adapters = {Gmap.class, ComponentExporter.class}, 
    resourceType = GmapImpl.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
    )
@Exporter(
    name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, 
    extensions = ExporterConstants.SLING_MODEL_EXTENSION
    )
public class GmapImpl implements Gmap {

    static final String RESOURCE_TYPE = "wknd-events/components/content/gmap";

    static final String LABEL_PN   = "label";
    static final String LAT_PN     = "lat";
    static final String LNG_PN     = "lng";
    static final String ZOOM_PN    = "zoom";
    static final String API_KEY_PN = "apiKey";

    private static final Logger log = LoggerFactory.getLogger(GmapImpl.class);

    @ScriptVariable
    private ValueMap properties;

    @ScriptVariable
    private Style currentStyle;

    
	@Override
	public String getExportedType() {
		return RESOURCE_TYPE;
    }

	/***
	 * Use `currentStyle` to get API Key since the key is stored on the Component's policy 
	 * configured as part of the template
	 */
    @Override
    public String getApiKey() {
        return currentStyle.get(API_KEY_PN, String.class);
    }

    @Override
    public String getLabel() {
        return properties.get(LABEL_PN, String.class);
    }

    @Override
    public Double getLat() {
        return properties.get(LAT_PN, Double.class);
    }

    @Override
    public Double getLng() {
        return properties.get(LNG_PN, Double.class);
    }

    @Override
    public Double getZoom() {
        return properties.get(ZOOM_PN, Double.class);
    }
  
}