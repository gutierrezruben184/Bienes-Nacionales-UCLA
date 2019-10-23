/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package API.service;

import API.EquipoReporteSolicitud;
import API.EquipoReporteSolicitudPK;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.PathSegment;

/**
 *
 * @author Lenovo
 */
@Stateless
@Path("api.equiporeportesolicitud")
public class EquipoReporteSolicitudFacadeREST extends AbstractFacade<EquipoReporteSolicitud> {

    @PersistenceContext(unitName = "UCLA-BNPU")
    private EntityManager em;

    private EquipoReporteSolicitudPK getPrimaryKey(PathSegment pathSegment) {
        /*
         * pathSemgent represents a URI path segment and any associated matrix parameters.
         * URI path part is supposed to be in form of 'somePath;pkEquipoid=pkEquipoidValue;pkReporteSolicitudid=pkReporteSolicitudidValue'.
         * Here 'somePath' is a result of getPath() method invocation and
         * it is ignored in the following code.
         * Matrix parameters are used as field names to build a primary key instance.
         */
        API.EquipoReporteSolicitudPK key = new API.EquipoReporteSolicitudPK();
        javax.ws.rs.core.MultivaluedMap<String, String> map = pathSegment.getMatrixParameters();
        java.util.List<String> pkEquipoid = map.get("pkEquipoid");
        if (pkEquipoid != null && !pkEquipoid.isEmpty()) {
            key.setPkEquipoid(new java.lang.Integer(pkEquipoid.get(0)));
        }
        java.util.List<String> pkReporteSolicitudid = map.get("pkReporteSolicitudid");
        if (pkReporteSolicitudid != null && !pkReporteSolicitudid.isEmpty()) {
            key.setPkReporteSolicitudid(new java.lang.Integer(pkReporteSolicitudid.get(0)));
        }
        return key;
    }

    public EquipoReporteSolicitudFacadeREST() {
        super(EquipoReporteSolicitud.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(EquipoReporteSolicitud entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") PathSegment id, EquipoReporteSolicitud entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") PathSegment id) {
        API.EquipoReporteSolicitudPK key = getPrimaryKey(id);
        super.remove(super.find(key));
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public EquipoReporteSolicitud find(@PathParam("id") PathSegment id) {
        API.EquipoReporteSolicitudPK key = getPrimaryKey(id);
        return super.find(key);
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<EquipoReporteSolicitud> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<EquipoReporteSolicitud> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces(MediaType.TEXT_PLAIN)
    public String countREST() {
        return String.valueOf(super.count());
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    
}
