package com.API;

import com.DAO.Conexion;
import com.DAO.UsuarioDAO;
import com.Modelo.Usuario;
import javax.swing.JOptionPane;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("usuario")
public class usuarioAPI {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUsuario() {
        UsuarioDAO usd = new UsuarioDAO();
        Usuario us = usd.buscarUsuario("123");
        if (us != null) {
            //return Response.status(200).entity(us).build();
            return Response.ok(us).build();
        } else {
            return Response.ok("no carga").build();
        }

    }
}
