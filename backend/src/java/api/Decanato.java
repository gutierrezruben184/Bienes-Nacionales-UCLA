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
@Table(name = "decanato")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Decanato.findAll", query = "SELECT d FROM Decanato d")
    , @NamedQuery(name = "Decanato.findByIddecanato", query = "SELECT d FROM Decanato d WHERE d.iddecanato = :iddecanato")
    , @NamedQuery(name = "Decanato.findByNombre", query = "SELECT d FROM Decanato d WHERE d.nombre = :nombre")
    , @NamedQuery(name = "Decanato.findByDireccion", query = "SELECT d FROM Decanato d WHERE d.direccion = :direccion")
    , @NamedQuery(name = "Decanato.findByEstatus", query = "SELECT d FROM Decanato d WHERE d.estatus = :estatus")})
public class Decanato implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "iddecanato")
    private Integer iddecanato;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "nombre")
    private String nombre;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 70)
    @Column(name = "direccion")
    private String direccion;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1)
    @Column(name = "estatus")
    private String estatus;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "fkIddecanato")
    private Collection<Departamento> departamentoCollection;

    public Decanato() {
    }

    public Decanato(Integer iddecanato) {
        this.iddecanato = iddecanato;
    }

    public Decanato(Integer iddecanato, String nombre, String direccion, String estatus) {
        this.iddecanato = iddecanato;
        this.nombre = nombre;
        this.direccion = direccion;
        this.estatus = estatus;
    }

    public Integer getIddecanato() {
        return iddecanato;
    }

    public void setIddecanato(Integer iddecanato) {
        this.iddecanato = iddecanato;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getEstatus() {
        return estatus;
    }

    public void setEstatus(String estatus) {
        this.estatus = estatus;
    }

    @XmlTransient
    public Collection<Departamento> getDepartamentoCollection() {
        return departamentoCollection;
    }

    public void setDepartamentoCollection(Collection<Departamento> departamentoCollection) {
        this.departamentoCollection = departamentoCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (iddecanato != null ? iddecanato.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Decanato)) {
            return false;
        }
        Decanato other = (Decanato) object;
        if ((this.iddecanato == null && other.iddecanato != null) || (this.iddecanato != null && !this.iddecanato.equals(other.iddecanato))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "api.Decanato[ iddecanato=" + iddecanato + " ]";
    }
    
}
