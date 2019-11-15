CREATE OR REPLACE FUNCTION estadistica(decid bigint) RETURNS table(
		idunidad int,
		departamento varchar,
		total_equipos BIGINT,
		equipos_buenos BIGINT,
		equipos_malos BIGINT,
		equipos_enReparacion BIGINT
		) AS
$$
DECLARE
 depart record;
 var record;
BEGIN
   FOR depart IN select dep.iddepartamento as unidad, nombre from departamento dep where fk_iddecanato=decid LOOP 
		 idunidad := depart.unidad;
		 departamento := depart.nombre;
		 total_equipos :=  count(*) as total_equipos from equipo where fk_iddepartamento=depart.unidad;
		 equipos_buenos :=  count(*) as equipos_buenos from equipo  where fk_iddepartamento=depart.unidad and fk_idestadoequipo='1';
		 equipos_malos :=  count(*) as equipos_malos from equipo where fk_iddepartamento=depart.unidad and fk_idestadoequipo='2';
		 equipos_enReparacion :=  count(*) as equipos_malos from equipo where fk_iddepartamento=depart.unidad and fk_idestadoequipo='3';
		return next;
  END LOOP;
END;
$$
LANGUAGE 'plpgsql'

select * from estadistica(3)

drop function estadistica()
