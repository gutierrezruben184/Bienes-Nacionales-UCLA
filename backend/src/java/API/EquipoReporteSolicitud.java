/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package API;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Lenovo
 */
@Entity
@Table(name = "equipo_reporte_solicitud")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "EquipoReporteSolicitud.findAll", query = "SELECT e FROM EquipoReporteSolicitud e")
    , @NamedQuery(name = "EquipoReporteSolicitud.findByPkEquipoid", query = "SELECT e FROM EquipoReporteSolicitud e WHERE e.equipoReporteSolicitudPK.pkEquipoid = :pkEquipoid")
    , @NamedQuery(name = "EquipoReporteSolicitud.findByPkReporteSolicitudid", query = "SELECT e FROM EquipoReporteSolicitud e WHERE e.equipoReporteSolicitudPK.pkReporteSolicitudid = :pkReporteSolicitudid")
    , @NamedQuery(name = "EquipoReporteSolicitud.findByFecharegistro", query = "SELECT e FROM EquipoReporteSolicitud e WHERE e.fecharegistro = :fecharegistro")})
public class EquipoReporteSolicitud implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected EquipoReporteSolicitudPK equipoReporteSolicitudPK;
    @Basic(optional = false)
    @NotNull
    @Column(name = "fecharegistro")
    @Temporal(TemporalType.DATE)
    private Date fecharegistro;
    @JoinColumn(name = "pk_equipoid", referencedColumnName = "idequipo", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Equipo equipo;
    @JoinColumn(name = "pk_reporte_solicitudid", referencedColumnName = "idreporte", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private ReporteSolicitud reporteSolicitud;

    public EquipoReporteSolicitud() {
    }

    public EquipoReporteSolicitud(EquipoReporteSolicitudPK equipoReporteSolicitudPK) {
        this.equipoReporteSolicitudPK = equipoReporteSolicitudPK;
    }

    public EquipoReporteSolicitud(EquipoReporteSolicitudPK equipoReporteSolicitudPK, Date fecharegistro) {
        this.equipoReporteSolicitudPK = equipoReporteSolicitudPK;
        this.fecharegistro = fecharegistro;
    }

    public EquipoReporteSolicitud(int pkEquipoid, int pkReporteSolicitudid) {
        this.equipoReporteSolicitudPK = new EquipoReporteSolicitudPK(pkEquipoid, pkReporteSolicitudid);
    }

    public EquipoReporteSolicitudPK getEquipoReporteSolicitudPK() {
        return equipoReporteSolicitudPK;
    }

    public void setEquipoReporteSolicitudPK(EquipoReporteSolicitudPK equipoReporteSolicitudPK) {
        this.equipoReporteSolicitudPK = equipoReporteSolicitudPK;
    }

    public Date getFecharegistro() {
        return fecharegistro;
    }

    public void setFecharegistro(Date fecharegistro) {
        this.fecharegistro = fecharegistro;
    }

    public Equipo getEquipo() {
        return equipo;
    }

    public void setEquipo(Equipo equipo) {
        this.equipo = equipo;
    }

    public ReporteSolicitud getReporteSolicitud() {
        return reporteSolicitud;
    }

    public void setReporteSolicitud(ReporteSolicitud reporteSolicitud) {
        this.reporteSolicitud = reporteSolicitud;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (equipoReporteSolicitudPK != null ? equipoReporteSolicitudPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof EquipoReporteSolicitud)) {
            return false;
        }
        EquipoReporteSolicitud other = (EquipoReporteSolicitud) object;
        if ((this.equipoReporteSolicitudPK == null && other.equipoReporteSolicitudPK != null) || (this.equipoReporteSolicitudPK != null && !this.equipoReporteSolicitudPK.equals(other.equipoReporteSolicitudPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "API.EquipoReporteSolicitud[ equipoReporteSolicitudPK=" + equipoReporteSolicitudPK + " ]";
    }
    
}
