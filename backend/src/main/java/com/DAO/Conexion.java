package com.DAO;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

// prueba de conexion a la base de datos
// si conecta
// los return son solo de prueba
public class Conexion {
    public static Connection Conectar(){
        try{
            Class.forName("org.postgresql.Driver");
            String url = "jdbc:postgresql://localhost:5432/BN-UCLA";
            Connection con = DriverManager.getConnection(url, "postgres", "java");
            return con;
        }catch(ClassNotFoundException ex){
            return null;
        }catch(SQLException ex){
            return null;
        }
    }
}
