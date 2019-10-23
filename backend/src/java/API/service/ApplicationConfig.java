/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package API.service;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author Lenovo
 */
@javax.ws.rs.ApplicationPath("webresources")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(API.corsFilter.class);
        resources.add(API.service.DecanatoFacadeREST.class);
        resources.add(API.service.DepartamentoFacadeREST.class);
        resources.add(API.service.EquipoFacadeREST.class);
        resources.add(API.service.EquipoReporteSolicitudFacadeREST.class);
        resources.add(API.service.EstadoEquipoFacadeREST.class);
        resources.add(API.service.MarcaFacadeREST.class);
        resources.add(API.service.ReporteSolicitudFacadeREST.class);
        resources.add(API.service.UsuarioFacadeREST.class);
    }
    
}
