package API;

import API.Decanato;
import API.Equipo;
import API.Usuario;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-10-25T10:17:21")
@StaticMetamodel(Departamento.class)
public class Departamento_ { 

    public static volatile SingularAttribute<Departamento, Integer> idunidad;
    public static volatile SingularAttribute<Departamento, String> estatus;
    public static volatile CollectionAttribute<Departamento, Equipo> equipoCollection;
    public static volatile CollectionAttribute<Departamento, Usuario> usuarioCollection;
    public static volatile SingularAttribute<Departamento, String> nombre;
    public static volatile SingularAttribute<Departamento, Decanato> fkDecanatoid;

}