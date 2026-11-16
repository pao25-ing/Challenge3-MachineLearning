# Presentación web · PCam Vision

La página principal del proyecto funciona como presentación interactiva. Mantiene la paleta del repositorio y utiliza imágenes y resultados reales del trabajo.

**Abrir:** https://pao25-ing.github.io/Challenge3-MachineLearning/

## Cómo usarla

1. En **Explorar**, desplázate por las 11 secciones o abre el índice de la barra superior.
2. Pulsa **Exponer** para recorrer una sección a la vez. Usa los botones inferiores, las flechas del teclado, Page Up o Page Down. Home vuelve al inicio y End lleva a la entrega.
3. Pulsa el botón de pantalla completa de la barra inferior si quieres ocupar toda la pantalla.
4. Activa **Notas** para leer el apoyo de la sección actual. Si compartes toda la pantalla, las notas también se verán. Esc cierra primero las notas o el índice; después permite salir de la exposición.
5. Pulsa el icono de ampliar para ver las imágenes y los gráficos. Esc cierra la vista ampliada.

Las flechas conservan su función dentro de selectores y controles interactivos. Para cambiar de diapositiva desde ellos, usa los botones inferiores o mueve el foco fuera del control.

## Qué se puede explorar

- **La CNN:** seis pasos desde los píxeles hasta la clase. Los dibujos son esquemas explicativos; la web no calcula predicciones ni muestra filtros aprendidos.
- **Los experimentos:** selecciona una de las cinco variantes para consultar sus cambios, épocas y tiempo de entrenamiento.
- **La comparación:** selecciona el conjunto y la métrica. La puntuación pública de Kaggle solo está disponible como balanced accuracy. Las barras siempre usan escala de 0 a 1.
- **El entrenamiento:** cambia entre BA de validación y pérdida. Las curvas corresponden a Dropout.
- **Los errores:** toca cada celda de la matriz para entender su significado. Las filas representan la clase real.

La web se adapta a pantallas pequeñas y respeta la preferencia del sistema de reducir movimiento. Se puede leer sin JavaScript; la tabla de métricas sigue disponible. Las funciones interactivas requieren JavaScript.

## De dónde salen los datos

| Elemento | Fuente |
|---|---|
| Imágenes de tejido | Salida ejecutada de `notebooks/01_analisis_dataset.ipynb` |
| Tamaños y equilibrio de clases | Análisis HDF5 guardado en `results/eda/` |
| Métricas de cinco CNN | `results/cnn/metricas_validacion.csv` |
| Puntajes públicos y selección final | `results/cnn/envios_kaggle.csv`, registro del 15 de noviembre de 2026 |
| Curvas de Dropout | `results/cnn/02_dropout/historial.csv` |
| Matriz de confusión | `results/cnn/matriz_confusion.csv` y su imagen |
| Método y conclusiones | `Documentación/INFORME_FINAL.md` y notebook de entrenamiento |

Los valores se incluyen en `docs/assets/data.js` como una copia de esos resultados para que la página no dependa de peticiones externas. Si se vuelven a entrenar los modelos, hay que actualizar esa copia y el contenido que menciona cifras. Las imágenes y la matriz están dentro de `docs/assets/`.

Dropout obtuvo BA de validación 0,7486889938079699. La base obtuvo 0,7484653048392147. La diferencia fue de aproximadamente 0,0224 puntos porcentuales con una sola semilla. Esto no demuestra una ventaja estable. Los puntajes públicos no se presentan como resultados privados ni como validación clínica.

## Archivos de la página

| Archivo | Función |
|---|---|
| `docs/index.html` | Contenido académico y estructura accesible |
| `docs/assets/app.css` | Paleta, diseño, adaptación móvil y modo de exposición |
| `docs/assets/data.js` | Resultados y funciones de cálculo |
| `docs/assets/app.js` | Navegación, notas, gráficos, ampliación y CNN interactiva |

Es una web estática. GitHub Pages la publica desde la carpeta `docs` de la rama `main`. No requiere instalar paquetes ni ejecutar un servidor de inferencia. Para leerla localmente se puede abrir `docs/index.html`; las fuentes de Google son opcionales y tienen alternativas del sistema.

## Comprobaciones realizadas

Se comprobó la sintaxis de JavaScript, la correspondencia de las cinco métricas con los CSV, las sumas y proporciones de la matriz, los once destinos del índice y las rutas de recursos locales. También se ejercitaron las interacciones principales con una simulación mínima del DOM: avance y límites, cambio de modo, notas, selección de modelos, métricas, pasos de la CNN, matriz y ampliación.

Esta sesión no contó con un navegador para revisar capturas o probar el diseño en una pantalla real. La comprobación visual en escritorio y móvil queda pendiente.
