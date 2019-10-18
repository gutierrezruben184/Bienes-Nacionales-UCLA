package com.DAO;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

// prueba de conexion a la base de datos
// si conecta
// los return son solo de prueba
public class Conexion {
    public static String Conectar(){
        try{
            Class.forName("org.postgresql.Driver");
            String url = "jdbc:postgresql://localhost:5432/BN-UCLA";
            Connection con = DriverManager.getConnection(url, "postgres", "java");
            return "conexion exitosa!";
        }catch(ClassNotFoundException ex){
             return "no driver!";
            //return null;
        }catch(SQLException ex){
            return ex.getMessage();
            //return null;
        }
    }
}
