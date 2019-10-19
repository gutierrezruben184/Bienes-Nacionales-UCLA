package com.DAO;

import com.Modelo.Usuario;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.JOptionPane;

public class UsuarioDAO {

    public UsuarioDAO() {
    }

    public boolean login(String cedula, String contra) {

        String sql = "SELECT * from Usuario where cedula=? and contrasenna=?";
        PreparedStatement login;
        try {
            login = Conexion.Conectar().prepareStatement(sql);
            login.setString(1, cedula);
            login.setString(2, contra);
            ResultSet rs = login.executeQuery();
            if (!rs.next()) {
                return true;
            } else {
                return false;
            }
        } catch (SQLException ex) {
            Logger.getLogger(UsuarioDAO.class.getName()).log(Level.SEVERE, null, ex);
            return false;
        }
    }

    public Usuario buscarUsuario(String cedula) {
        String sql = "SELECT * from Usuario where cedula=? ";
        PreparedStatement buscar;

        try {
            buscar = Conexion.Conectar().prepareStatement(sql);
            buscar.setString(1, cedula);
            ResultSet rs = buscar.executeQuery();
            if (!rs.next()) {
               
                return null;
            } else {

                
                String ced = rs.getString("cedula");
                String con = rs.getString("contrasenna");
                int unId = rs.getInt("fk_unidadid");
                String nom = rs.getString("nombre");
                String apll = rs.getString("apellido");
                String corr = rs.getString("correo");
                String tipo = rs.getString("tipo");
                String estatus = rs.getString("estatus");
                Usuario us = new Usuario(ced, con, unId, nom, apll, corr, tipo, estatus);
            
                return us;
            }
        } catch (SQLException ex) {
            //JOptionPane.showMessageDialog(null, "erorr");
            Logger.getLogger(UsuarioDAO.class.getName()).log(Level.SEVERE, null, ex);
           
            return null;
        }

    }
}
