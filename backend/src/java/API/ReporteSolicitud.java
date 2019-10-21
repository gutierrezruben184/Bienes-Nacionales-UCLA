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
@Table(name = "reporte_solicitud")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ReporteSolicitud.findAll", query = "SELECT r FROM ReporteSolicitud r")
    , @NamedQuery(name = "ReporteSolicitud.findByIdreporte", query = "SELECT r FROM ReporteSolicitud r WHERE r.idreporte = :idreporte")
    , @NamedQuery(name = "ReporteSolicitud.findByEquipoid", query = "SELECT r FROM ReporteSolicitud r WHERE r.equipoid = :equipoid")
    , @NamedQuery(name = "ReporteSolicitud.findByTipo", query = "SELECT r FROM ReporteSolicitud r WHERE r.tipo = :tipo")
    , @NamedQuery(name = "ReporteSolicitud.findByDescripcion", query = "SELECT r FROM ReporteSolicitud r WHERE r.descripcion = :descripcion")
    , @NamedQuery(name = "ReporteSolicitud.findByObservacion", query = "SELECT r FROM ReporteSolicitud r WHERE r.observacion = :observacion")
    , @NamedQuery(name = "ReporteSolicitud.findByEstatus", query = "SELECT r FROM ReporteSolicitud r WHERE r.estatus = :estatus")})
public class ReporteSolicitud implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idreporte")
    private Integer idreporte;
    @Basic(optional = false)
    @NotNull
    @Column(name = "equipoid")
    private int equipoid;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1)
    @Column(name = "tipo")
    private String tipo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 500)
    @Column(name = "descripcion")
    private String descripcion;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 500)
    @Column(name = "observacion")
    private String observacion;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1)
    @Column(name = "estatus")
    private String estatus;
    @JoinColumn(name = "fk_usuariocedula", referencedColumnName = "cedula")
    @ManyToOne(optional = false)
    private Usuario fkUsuariocedula;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "reporteSolicitud")
    private Collection<EquipoReporteSolicitud> equipoReporteSolicitudCollection;

    public ReporteSolicitud() {
    }

    public ReporteSolicitud(Integer idreporte) {
        this.idreporte = idreporte;
    }

    public ReporteSolicitud(Integer idreporte, int equipoid, String tipo, String descripcion, String observacion, String estatus) {
        this.idreporte = idreporte;
        this.equipoid = equipoid;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.observacion = observacion;
        this.estatus = estatus;
    }

    public Integer getIdreporte() {
        return idreporte;
    }

    public void setIdreporte(Integer idreporte) {
        this.idreporte = idreporte;
    }

    public int getEquipoid() {
        return equipoid;
    }

    public void setEquipoid(int equipoid) {
        this.equipoid = equipoid;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public String getEstatus() {
        return estatus;
    }

    public void setEstatus(String estatus) {
        this.estatus = estatus;
    }

    public Usuario getFkUsuariocedula() {
        return fkUsuariocedula;
    }

    public void setFkUsuariocedula(Usuario fkUsuariocedula) {
        this.fkUsuariocedula = fkUsuariocedula;
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
        hash += (idreporte != null ? idreporte.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ReporteSolicitud)) {
            return false;
        }
        ReporteSolicitud other = (ReporteSolicitud) object;
        if ((this.idreporte == null && other.idreporte != null) || (this.idreporte != null && !this.idreporte.equals(other.idreporte))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "API.ReporteSolicitud[ idreporte=" + idreporte + " ]";
    }
    
}
