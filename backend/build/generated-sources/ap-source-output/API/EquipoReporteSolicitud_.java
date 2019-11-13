package API;

import API.Equipo;
import API.EquipoReporteSolicitudPK;
import API.ReporteSolicitud;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-11-07T23:30:50")
@StaticMetamodel(EquipoReporteSolicitud.class)
public class EquipoReporteSolicitud_ { 

    public static volatile SingularAttribute<EquipoReporteSolicitud, EquipoReporteSolicitudPK> equipoReporteSolicitudPK;
    public static volatile SingularAttribute<EquipoReporteSolicitud, Equipo> equipo;
    public static volatile SingularAttribute<EquipoReporteSolicitud, ReporteSolicitud> reporteSolicitud;
    public static volatile SingularAttribute<EquipoReporteSolicitud, Date> fecharegistro;

}