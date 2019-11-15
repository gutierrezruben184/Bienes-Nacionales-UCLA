/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sevices;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author R
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
        resources.add(sevices.DecanatoFacadeREST.class);
        resources.add(sevices.DepartamentoFacadeREST.class);
        resources.add(sevices.DepreciacionFacadeREST.class);
        resources.add(sevices.EquipoFacadeREST.class);
        resources.add(sevices.EstadoEquipoFacadeREST.class);
        resources.add(sevices.MarcaFacadeREST.class);
        resources.add(sevices.ReporteSolicitudFacadeREST.class);
        resources.add(sevices.UsuarioFacadeREST.class);
        resources.add(sevices.corsFilter.class);
    }
    
}
