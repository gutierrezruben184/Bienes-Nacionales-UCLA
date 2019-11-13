package API;

import API.Departamento;
import API.EquipoReporteSolicitud;
import API.EstadoEquipo;
import API.Marca;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-11-07T23:30:50")
@StaticMetamodel(Equipo.class)
public class Equipo_ { 

    public static volatile SingularAttribute<Equipo, Marca> fkIdmarca;
    public static volatile SingularAttribute<Equipo, Integer> idequipo;
    public static volatile SingularAttribute<Equipo, Departamento> fkIddepartamento;
    public static volatile SingularAttribute<Equipo, String> nombre;
    public static volatile CollectionAttribute<Equipo, EquipoReporteSolicitud> equipoReporteSolicitudCollection;
    public static volatile SingularAttribute<Equipo, EstadoEquipo> fkIdestadoequipo;

}