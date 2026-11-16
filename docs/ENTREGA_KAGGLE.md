# Entrega del Challenge 3 en Kaggle

## Qué se traslada desde GitHub

Kaggle ejecuta el archivo `.ipynb`; no se necesita subir el repositorio completo. Para entrenar se utiliza [02_entrenamiento_cnn.ipynb](../notebooks/02_entrenamiento_cnn.ipynb). Los HDF5 se añaden desde la competición o se colocan en Drive si se trabaja en Colab. Para obtener una puntuación en la competición se envía después un CSV de predicciones.

## Estado verificado

| Parte | Estado |
|---|---|
| Descripción y referencias de la competición | Documentadas en el README |
| Análisis exploratorio | Ejecutado, con salidas en notebook 01 y resultados en eda |
| CNN | Código preparado en notebook 02; ejecución oficial pendiente |
| Métricas y candidatos de entrega | Se generan al completar la ejecución; todavía no publicados |
| Identificadores de prueba | Correspondencia pendiente de confirmar |
| Participación grupal | Una cuenta entrega e incluye los cuatro autores, según indicación del docente |
| Envíos y puntuaciones | No acreditados en este repositorio |

## Autores que deben figurar en Kaggle

**Grupo 1 — Machine Learning, UPCH, 2026-II**

- César Alejandro Aarón Apcho Meneses
- Paola Andrea Centeno Bazán
- Anderson Josué Delerna Infantes
- Jimena Natalia Vega Sánchez

Docente: Yannick Patrick Carrasco Merma.

La competición limita el tamaño de equipo a una persona. Según la indicación recibida del docente, una sola cuenta presenta el trabajo e incluye los cuatro nombres en el notebook. Este reconocimiento académico no cambia la composición técnica del equipo en Kaggle. La cuenta que realice la entrega debe identificarse en la presentación final.

## Ejecutar desde Google Colab

1. Abrir el [notebook 02 en Colab](https://colab.research.google.com/github/pao25-ing/Challenge3-MachineLearning/blob/main/notebooks/02_entrenamiento_cnn.ipynb).
2. Activar una GPU desde **Entorno de ejecución → Cambiar tipo de entorno de ejecución**.
3. Colocar `train.h5`, `valid.h5` y `test_x.h5` descomprimidos en `Mi unidad/Challenge3/data`.
4. Seleccionar **Ejecutar todas** y autorizar Drive.
5. Esperar la finalización de las cinco configuraciones. Revisar la tabla de validación, las curvas y la matriz de confusión.
6. Conservar la carpeta `Mi unidad/Challenge3/results/cnn` y guardar el notebook ejecutado en GitHub. Los contadores y salidas deben corresponder a esa ejecución real.

## Importar y ejecutar en Kaggle

1. Iniciar sesión con la cuenta que hará la entrega y comprobar que puede acceder a los datos de [TNM112-Lab2 (2026)](https://www.kaggle.com/competitions/tnm-112-lab-2-2026).
2. Descargar el archivo [02_entrenamiento_cnn.ipynb](../notebooks/02_entrenamiento_cnn.ipynb) desde GitHub.
3. Crear un notebook en Kaggle e importar ese archivo mediante la opción **Import Notebook** del editor.
4. Añadir los archivos de la competición desde **Add Input** y seleccionar una GPU.
5. Comprobar que la descripción conserva los cuatro nombres, ejecutar y guardar una versión completa.
6. Descargar el notebook terminado y las métricas para actualizar las evidencias del repositorio.

Si la cuenta todavía necesita aceptar las condiciones de la competición o verificar su identidad, ese paso lo completa el titular de la cuenta.

## Confirmar los ID antes de enviar

La página oficial de evaluación pide columnas `ID` y `Class`, y muestra un ejemplo que comienza en 1. El archivo `test_x.h5` no contiene identificadores y el análisis disponible no acredita la correspondencia completa.

El notebook conserva el orden de las imágenes y construye candidatos con ID de 1 a 32768. Por defecto utiliza `IDS_CONFIRMADOS = False`, por lo que esos archivos quedan marcados como candidatos. Antes de enviarlos, comprobar el orden y el rango con el notebook de referencia del organizador o una aclaración oficial. Registrar esa fuente en `FUENTE_IDS` y cambiar `IDS_CONFIRMADOS = True` solo cuando se haya confirmado.

Volver a ejecutar la exportación con los ID confirmados genera `submission.csv` para el mejor modelo seleccionado con validación. No deben enviarse probabilidades en lugar de las etiquetas 0/1.

## Registrar los cinco envíos

La descripción oficial solicita al menos cinco envíos válidos, con resultados superiores a una predicción aleatoria. Las cinco configuraciones del notebook son experimentos distintos, pero no se afirma de antemano que todos cumplan el requisito. Si una configuración no alcanza un resultado suficiente, se modifica, se vuelve a evaluar y se documenta el cambio.

Después de cada envío se registra:

| Fecha | Experimento | Archivo y SHA-256 | Estado en Kaggle | Puntuación pública | Enlace o evidencia |
|---|---|---|---|---|---|
| Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |

No se completa esta tabla con métricas de validación: la puntuación pública se obtiene al procesar el archivo en Kaggle.

## Criterios para el informe y la presentación finales

La documentación final debe describir la implementación y los resultados reales:

- Entrada de la CNN: **32 × 32 × 3**, correspondiente a esta competición.
- Métrica principal: **Balanced Accuracy**. Accuracy, precision, recall, F1 y ROC-AUC son complementarias.
- Entrega: **ID,Class**, con clases 0 o 1 y una fila por imagen de prueba.
- Describir como realizados únicamente los entrenamientos y comparaciones respaldados por las salidas.
- Incorporar las configuraciones, resultados y cambios efectivamente probados después de ejecutar el cuaderno.

La rúbrica solicita además una presentación Canva o Google Slides compartida para los primeros tres apartados. El enlace compartido debe añadirse cuando el equipo lo proporcione.

## Fuentes

- [Competición](https://www.kaggle.com/competitions/tnm-112-lab-2-2026).
- [Evaluación y formato de entrega](https://www.kaggle.com/competitions/tnm-112-lab-2-2026/overview/evaluation).
- Rúbrica del Challenge 3 de Machine Learning, UPCH, facilitada por el docente.

