package com.adobe.aem.guides.wkndevents.core.models;

import javax.annotation.Nullable;

import com.adobe.cq.export.json.ComponentExporter;

public interface Gmap extends ComponentExporter {
    
    /**
     * Google API Key
     *
     * @return
     */
    @Nullable
    public String getApiKey();

    /**
     * Label to display on map marker
     *
     * @return
     */
    @Nullable
    public String getLabel();

     /**
     * Returns latitude of center of map
     *
     * @return
     */
    @Nullable
    public Double getLat();

    /**
     * Returns longitude of center of map
     *
     * @return
     */
    @Nullable
    public Double getLng();

    /**
     * Returns the default zoom of map
     *
     * @return
     */
    @Nullable
    public Double getZoom();

}