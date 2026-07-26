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

### Reglas avanzadas de puntaje

Además de la fórmula base, se suman o restan estos conceptos:

| Concepto | Valor |
| --- | --- |
| Bonus por racha de 3 aciertos seguidos o más | +20 puntos por cada acierto de la racha |
| Penalización extra por cada error seguido a partir del segundo | +5 puntos sobre la penalización del nivel, por cada error consecutivo |
| Bonus por terminar fácil en 60 segundos o menos | +100 puntos |
| Bonus por terminar medio en 90 segundos o menos | +100 puntos |
| Bonus por terminar difícil en 150 segundos o menos | +100 puntos |
| Bonus por completar con pocos intentos (pares del nivel + 2 o menos) | +100 puntos |

La racha de aciertos y la de errores seguidos se cortan apenas ocurre el evento contrario. El modal
de victoria muestra el desglose completo de cada concepto que sumó o restó puntos.

## Ranking, modo oscuro, modo progresivo y sonidos

- **Ranking**: cada partida guarda jugador, nivel, puntaje, intentos, errores, fecha y duración en
  LocalStorage (clave `memotest-partidas`, últimas 50 partidas). Se puede ordenar por puntaje, fecha,
  duración o nivel, y borrar el historial completo con confirmación.
- **Modo oscuro y claro**: preferencia guardada en LocalStorage (clave `memotest-tema`), disponible en
  el juego y en la página de contacto.
- **Modo progresivo**: arranca en fácil y avanza automáticamente a medio y difícil, acumulando el
  puntaje entre niveles. Al terminar los tres niveles muestra un resultado general y guarda una única
  partida marcada como "Progresivo" en el ranking.
- **Sonidos**: al seleccionar una carta, acertar un par, cometer un error y ganar la partida. Se
  pueden activar o desactivar, con la preferencia guardada en LocalStorage (clave `memotest-sonidos`).

## Fuente de las imágenes

Las banderas de `assets/images/banderas/` son del proyecto [flag-icons](https://github.com/lipis/flag-icons)
de Panayiotis Lipiridis, publicado bajo licencia MIT.

## Fuente de los sonidos

- `acierto.mp3` y `victoria.mp3`: incluidos en la estructura inicial del proyecto.
- `seleccionar.wav` y `error.wav`: generados para este proyecto con un script propio (tonos
  sintetizados con el módulo `wave` de Python), sin usar audio de terceros.

## Integrantes

- Ignacio Cainelli
- Alejandro Santini
- Rodolfo Meroi
