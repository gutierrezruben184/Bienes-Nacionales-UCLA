/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package services;

import api.Decanato;
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

import util.TotalDecanato;
import util.Conexion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import util.TotalDepartamento;

/**
 *
 * @author R
 */
@Stateless
@Path("api.decanato")
public class DecanatoFacadeREST extends AbstractFacade<Decanato> {

    @PersistenceContext(unitName = "backendPU")
    private EntityManager em;

    public DecanatoFacadeREST() {
        super(Decanato.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void create(Decanato entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Decanato entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Decanato find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Decanato> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Decanato> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
    
    @GET
    @Path("estadistica")
    @Produces({MediaType.APPLICATION_JSON})
    public List<TotalDecanato> listado() {
        //Declaraciones
        TotalDecanato totalDec;
        TotalDepartamento totalDep;
        List<TotalDecanato> listTotalDec = new ArrayList<TotalDecanato>();
        
        int total = 0;
        int buenos = 0;
        int malos = 0; 
        int enReparacion = 0;
        
        //fuckin persistente >:v
        Connection con = Conexion.Conectar();
        PreparedStatement p;
        ResultSet rs;
        //Me traigo todos los decanatos para recorerlos
        List<Decanato> listDec = em.createQuery("SELECT d FROM Decanato d").getResultList();
        try {

            //Crea la funcion para los totales de los departamentos
            

            //Por cada decanato ejecuta la funcion
            for (Decanato decanato : listDec ){
                p = con.prepareStatement("select * from estadistica("+ decanato.getIddecanato() +")");
                rs = p.executeQuery();
                total = 0;
                buenos = 0;
                malos = 0;
                enReparacion = 0;
                List<TotalDepartamento> lisTotalDep = new ArrayList<TotalDepartamento>();
                while(rs.next()){
                    totalDep  = new TotalDepartamento();
                    totalDep.setIdDepartamento(rs.getInt(1));
                    totalDep.setNombreDepartamento(rs.getString(2));
                    totalDep.setTotal(rs.getInt(3));
                    totalDep.setBuenos(rs.getInt(4));
                    totalDep.setMalos(rs.getInt(5));
                    totalDep.setEnReparacion(rs.getInt(6));
                    total += totalDep.getTotal();
                    buenos += totalDep.getBuenos();
                    malos += totalDep.getMalos();
                    enReparacion += totalDep.getEnReparacion();
                    lisTotalDep.add(totalDep);
                }
                totalDec = new TotalDecanato();
                totalDec.setIdDecanato(decanato.getIddecanato());
                totalDec.setNombreDecanato(decanato.getNombre());
                totalDec.setTotal(total);
                totalDec.setBuenos(buenos);
                totalDec.setMalos(malos);
                totalDec.setEnReparacion(enReparacion);
                totalDec.setTd(lisTotalDep);
                listTotalDec.add(totalDec);
            }
        } catch (SQLException ex) {
            Logger.getLogger(DecanatoFacadeREST.class.getName()).log(Level.SEVERE, null, ex);
        }
        return listTotalDec;
    }
    
}
