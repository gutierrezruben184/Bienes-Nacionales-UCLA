/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package api;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
 * @author R
 */
@Entity
@Table(name = "estado_equipo")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "EstadoEquipo.findAll", query = "SELECT e FROM EstadoEquipo e")
    , @NamedQuery(name = "EstadoEquipo.findByIdestadoequipo", query = "SELECT e FROM EstadoEquipo e WHERE e.idestadoequipo = :idestadoequipo")
    , @NamedQuery(name = "EstadoEquipo.findByTipo", query = "SELECT e FROM EstadoEquipo e WHERE e.tipo = :tipo")})
public class EstadoEquipo implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idestadoequipo")
    private Integer idestadoequipo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 30)
    @Column(name = "tipo")
    private String tipo;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "fkIdestadoequipo")
    private Collection<Equipo> equipoCollection;

    public EstadoEquipo() {
    }

    public EstadoEquipo(Integer idestadoequipo) {
        this.idestadoequipo = idestadoequipo;
    }

    public EstadoEquipo(Integer idestadoequipo, String tipo) {
        this.idestadoequipo = idestadoequipo;
        this.tipo = tipo;
    }

    public Integer getIdestadoequipo() {
        return idestadoequipo;
    }

    public void setIdestadoequipo(Integer idestadoequipo) {
        this.idestadoequipo = idestadoequipo;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    @XmlTransient
    public Collection<Equipo> getEquipoCollection() {
        return equipoCollection;
    }

    public void setEquipoCollection(Collection<Equipo> equipoCollection) {
        this.equipoCollection = equipoCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idestadoequipo != null ? idestadoequipo.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof EstadoEquipo)) {
            return false;
        }
        EstadoEquipo other = (EstadoEquipo) object;
        if ((this.idestadoequipo == null && other.idestadoequipo != null) || (this.idestadoequipo != null && !this.idestadoequipo.equals(other.idestadoequipo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "api.EstadoEquipo[ idestadoequipo=" + idestadoequipo + " ]";
    }
    
}
