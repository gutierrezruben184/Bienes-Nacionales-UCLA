package util;


public class TotalDepartamento {
    
    private Integer idDepartamento;
    private String nombreDepartamento;
    private Integer total;
    private Integer buenos;
    private Integer malos;
    private Integer enReparacion;

    public TotalDepartamento() {
    }

    public Integer getIdDepartamento() {
        return idDepartamento;
    }

    public void setIdDepartamento(Integer idDepartamento) {
        this.idDepartamento = idDepartamento;
    }

    public String getNombreDepartamento() {
        return nombreDepartamento;
    }

    public void setNombreDepartamento(String nombreDepartamento) {
        this.nombreDepartamento = nombreDepartamento;
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
    
    
    
}
