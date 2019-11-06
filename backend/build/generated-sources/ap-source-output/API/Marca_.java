package API;

import API.Equipo;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-10-25T10:17:21")
@StaticMetamodel(Marca.class)
public class Marca_ { 

    public static volatile SingularAttribute<Marca, Integer> idmarca;
    public static volatile CollectionAttribute<Marca, Equipo> equipoCollection;
    public static volatile SingularAttribute<Marca, String> nombre;

}