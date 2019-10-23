/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package API;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Lenovo
 */
@Entity
@Table(name = "equipo")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Equipo.findAll", query = "SELECT e FROM Equipo e")
    , @NamedQuery(name = "Equipo.findByIdequipo", query = "SELECT e FROM Equipo e WHERE e.idequipo = :idequipo")
    , @NamedQuery(name = "Equipo.findByNombre", query = "SELECT e FROM Equipo e WHERE e.nombre = :nombre")})
public class Equipo implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idequipo")
    private Integer idequipo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 30)
    @Column(name = "nombre")
    private String nombre;
    @JoinColumn(name = "fk_iddepartamento", referencedColumnName = "idunidad")
    @ManyToOne(optional = false)
    private Departamento fkIddepartamento;
    @JoinColumn(name = "fk_idestadoequipo", referencedColumnName = "idestadoequipo")
    @ManyToOne(optional = false)
    private EstadoEquipo fkIdestadoequipo;
    @JoinColumn(name = "fk_idmarca", referencedColumnName = "idmarca")
    @ManyToOne(optional = false)
    private Marca fkIdmarca;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "equipo")
    private Collection<EquipoReporteSolicitud> equipoReporteSolicitudCollection;

    public Equipo() {
    }

    public Equipo(Integer idequipo) {
        this.idequipo = idequipo;
    }

    public Equipo(Integer idequipo, String nombre) {
        this.idequipo = idequipo;
        this.nombre = nombre;
    }

    public Integer getIdequipo() {
        return idequipo;
    }

    public void setIdequipo(Integer idequipo) {
        this.idequipo = idequipo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Departamento getFkIddepartamento() {
        return fkIddepartamento;
    }

    public void setFkIddepartamento(Departamento fkIddepartamento) {
        this.fkIddepartamento = fkIddepartamento;
    }

    public EstadoEquipo getFkIdestadoequipo() {
        return fkIdestadoequipo;
    }

    public void setFkIdestadoequipo(EstadoEquipo fkIdestadoequipo) {
        this.fkIdestadoequipo = fkIdestadoequipo;
    }

    public Marca getFkIdmarca() {
        return fkIdmarca;
    }

    public void setFkIdmarca(Marca fkIdmarca) {
        this.fkIdmarca = fkIdmarca;
    }

    @XmlTransient
    public Collection<EquipoReporteSolicitud> getEquipoReporteSolicitudCollection() {
        return equipoReporteSolicitudCollection;
    }

    public void setEquipoReporteSolicitudCollection(Collection<EquipoReporteSolicitud> equipoReporteSolicitudCollection) {
        this.equipoReporteSolicitudCollection = equipoReporteSolicitudCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idequipo != null ? idequipo.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Equipo)) {
            return false;
        }
        Equipo other = (Equipo) object;
        if ((this.idequipo == null && other.idequipo != null) || (this.idequipo != null && !this.idequipo.equals(other.idequipo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "API.Equipo[ idequipo=" + idequipo + " ]";
    }
    
}
