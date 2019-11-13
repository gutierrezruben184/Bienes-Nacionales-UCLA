package API;

import API.EquipoReporteSolicitud;
import API.Usuario;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-11-07T23:30:50")
@StaticMetamodel(ReporteSolicitud.class)
public class ReporteSolicitud_ { 

    public static volatile SingularAttribute<ReporteSolicitud, Integer> equipoid;
    public static volatile SingularAttribute<ReporteSolicitud, String> descripcion;
    public static volatile SingularAttribute<ReporteSolicitud, String> tipo;
    public static volatile SingularAttribute<ReporteSolicitud, Integer> idreporte;
    public static volatile SingularAttribute<ReporteSolicitud, String> estatus;
    public static volatile SingularAttribute<ReporteSolicitud, String> observacion;
    public static volatile CollectionAttribute<ReporteSolicitud, EquipoReporteSolicitud> equipoReporteSolicitudCollection;
    public static volatile SingularAttribute<ReporteSolicitud, Usuario> fkUsuariocedula;

}