/* A partir de las siguientes tablas, generar una consulta SQL que identifique los libros que la alumna Sonia tiene prestados, que no ha devuelto y cuyo préstamo está vencido al día 30/07/2021.*/

SELECT l.Nombres AS libro, P.Fecha_prestamo, l.Dias_limite_prestamo
FROM PRESTAMO P 
join ALUMNO A ON P.id_alumno =A.id
join LIBRO l ON p.id_libro = l.id
WHERE A.Nombres = "Sonia"
AND P.Entregado = false
AND DATE_ADD( STR_TO_DATE(P.Fecha_prestamo, "%d/%m/%y"), INTERVAL l.Dias_limite_prestamo DAY)< 
STR_TO_DATE("30/07/2021", "%d/%m/%y");


/*  Con Join unimos prestamo y alumno, despues unimos prestamo con libro, para filtrar los resultados que contengan a Sonia y los que no se hayan entregado, tambien se comprueba la fecha de vencimiento con la fecha indicada para que tambien sean filtrados y nos devuleva el resultado de la consulta de los libros que Sonia no ha devuleto y su prestamo ya caducó
 */