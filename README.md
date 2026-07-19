# Memotest Mundial 2026

Examen final de Desarrollo y Arquitecturas Web (UAI, 2026): un juego de memoria (memotest) hecho con
HTML5, CSS3 y JavaScript.

## Temática

Banderas de las selecciones del Mundial 2026.

## Sistema de puntaje

| Concepto | Valor |
| --- | --- |
| Par correcto | +100 puntos |
| Error en fácil | -10 puntos |
| Error en medio | -20 puntos |
| Error en difícil | -30 puntos |
| Bonus por completar la partida | +300 puntos |
| Penalización por tiempo | -1 punto por cada segundo transcurrido |

El bonus y la penalización por tiempo se aplican una sola vez, al finalizar la partida. El puntaje
nunca queda en negativo: si una resta lo llevaría por debajo de 0, se acota a 0.

## Ranking y modo oscuro

- **Ranking**: cada partida guarda jugador, nivel, puntaje, intentos, errores, fecha y duración en
  LocalStorage (clave `memotest-partidas`, últimas 50 partidas). Se puede ordenar por puntaje, fecha,
  duración o nivel, y borrar el historial completo con confirmación.
- **Modo oscuro y claro**: preferencia guardada en LocalStorage (clave `memotest-tema`), disponible en
  el juego y en la página de contacto.

## Fuente de las imágenes

Las banderas de `assets/images/banderas/` son del proyecto [flag-icons](https://github.com/lipis/flag-icons)
de Panayiotis Lipiridis, publicado bajo licencia MIT.

## Integrantes

- Ignacio Cainelli
- Alejandro Santini
- Rodolfo Meroi
