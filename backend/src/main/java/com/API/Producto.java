package com.API;

import com.DAO.Conexion;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("productos")
public class Producto{
    
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProducto(){
        
        return Response.ok(Conexion.Conectar()).build();
    }
}
