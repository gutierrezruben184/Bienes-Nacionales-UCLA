/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package util;

import java.util.List;

/**
 *
 * @author R
 */
public class TotalDecanato {
    
    private Integer idDecanato;
    private String nombreDecanato;
    private Integer total;
    private Integer buenos;
    private Integer malos;
    private Integer enReparacion;
    private List<TotalDepartamento> td;

    public TotalDecanato(Integer idDecanato, String nombreDecanato, Integer total, Integer buenos, Integer malos, Integer enReparacion, List<TotalDepartamento> td) {
        this.idDecanato = idDecanato;
        this.nombreDecanato = nombreDecanato;
        this.total = total;
        this.buenos = buenos;
        this.malos = malos;
        this.enReparacion = enReparacion;
        this.td = td;
    }

    public TotalDecanato() {
    }

    public Integer getIdDecanato() {
        return idDecanato;
    }

    public void setIdDecanato(Integer idDecanato) {
        this.idDecanato = idDecanato;
    }

    public String getNombreDecanato() {
        return nombreDecanato;
    }

    public void setNombreDecanato(String nombreDecanato) {
        this.nombreDecanato = nombreDecanato;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Integer getBuenos() {
        return buenos;
    }

    public void setBuenos(Integer buenos) {
        this.buenos = buenos;
    }

    public Integer getMalos() {
        return malos;
    }

    public void setMalos(Integer malos) {
        this.malos = malos;
    }

    public Integer getEnReparacion() {
        return enReparacion;
    }

    public void setEnReparacion(Integer enReparacion) {
        this.enReparacion = enReparacion;
    }

    public List<TotalDepartamento> getTd() {
        return td;
    }

    public void setTd(List<TotalDepartamento> td) {
        this.td = td;
    }
    
    
}
