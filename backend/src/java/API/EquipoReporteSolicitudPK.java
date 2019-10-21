/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package API;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

/**
 *
 * @author Lenovo
 */
@Embeddable
public class EquipoReporteSolicitudPK implements Serializable {

    @Basic(optional = false)
    @NotNull
    @Column(name = "pk_equipoid")
    private int pkEquipoid;
    @Basic(optional = false)
    @NotNull
    @Column(name = "pk_reporte_solicitudid")
    private int pkReporteSolicitudid;

    public EquipoReporteSolicitudPK() {
    }

    public EquipoReporteSolicitudPK(int pkEquipoid, int pkReporteSolicitudid) {
        this.pkEquipoid = pkEquipoid;
        this.pkReporteSolicitudid = pkReporteSolicitudid;
    }

    public int getPkEquipoid() {
        return pkEquipoid;
    }

    public void setPkEquipoid(int pkEquipoid) {
        this.pkEquipoid = pkEquipoid;
    }

    public int getPkReporteSolicitudid() {
        return pkReporteSolicitudid;
    }

    public void setPkReporteSolicitudid(int pkReporteSolicitudid) {
        this.pkReporteSolicitudid = pkReporteSolicitudid;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) pkEquipoid;
        hash += (int) pkReporteSolicitudid;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof EquipoReporteSolicitudPK)) {
            return false;
        }
        EquipoReporteSolicitudPK other = (EquipoReporteSolicitudPK) object;
        if (this.pkEquipoid != other.pkEquipoid) {
            return false;
        }
        if (this.pkReporteSolicitudid != other.pkReporteSolicitudid) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "API.EquipoReporteSolicitudPK[ pkEquipoid=" + pkEquipoid + ", pkReporteSolicitudid=" + pkReporteSolicitudid + " ]";
    }
    
}
