package util;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class JWT implements Serializable {
    
    
    @Id
    private String token;
    private String cedula;
    private String tipo;
    private String nombre;
    private int depto;

    public JWT() {
    }

    public JWT(String token, String cedula, String tipo, String nombre, int depto) {
        this.token = token;
        this.cedula = cedula;
        this.tipo = tipo;
        this.nombre = nombre;
        this.depto = depto;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getDepto() {
        return depto;
    }

    public void setDepto(int depto) {
        this.depto = depto;
    }
    
    
}
