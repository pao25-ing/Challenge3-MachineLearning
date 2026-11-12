# Datos de la competición

La competición [TNM112-Lab2 (2026)](https://www.kaggle.com/competitions/tnm-112-lab-2-2026/data) utiliza un subconjunto de PatchCamelyon (PCam), formado por imágenes de tejido de ganglios linfáticos. Cada imagen de la competición tiene **32 × 32 píxeles y tres canales de color**.

El PCam original contiene fragmentos de 96 × 96 píxeles; la etiqueta positiva se define por la presencia de tejido tumoral en la región central de 32 × 32. Los organizadores indican que las imágenes de la competición fueron recortadas a 32 × 32, aunque no se ha verificado el procedimiento exacto del recorte.

## Archivos

| Archivo | Uso | Imágenes | ¿Tiene etiquetas? |
|---|---|---:|---|
| `train.h5` | Entrenamiento | 100 000 | Sí |
| `valid.h5` | Validación | 32 768 | Sí |
| `test_x.h5` | Prueba | 32 768 | No |

Los archivos tienen formato HDF5. La clave `x` contiene las imágenes; la clave `y` contiene las etiquetas cuando están disponibles: **0** para la clase negativa y **1** para la positiva. Las imágenes y etiquetas son de tipo `uint8`. El archivo de prueba solo contiene `x`: no tiene etiquetas ni identificadores. Para la submission queda pendiente verificar cómo se relaciona el orden de las imágenes con los `ID` que solicita Kaggle.

## Uso de los archivos

Los archivos `.h5` se descargan desde la página de Kaggle y no están incluidos en este repositorio por su tamaño. Para analizarlos en Colab, se colocan los tres archivos descomprimidos en `Mi unidad/Challenge3/data` de Google Drive. Los pasos completos están en el [cuaderno de análisis](../notebooks/README.md).

Los resultados obtenidos se pueden consultar en el [análisis exploratorio](../results/eda/README.md).

## Fuentes

- [Datos de TNM112-Lab2 (2026)](https://www.kaggle.com/competitions/tnm-112-lab-2-2026/data).
- [PatchCamelyon benchmark](https://patchcamelyon.grand-challenge.org/).
- Veeling et al., [Rotation Equivariant CNNs for Digital Pathology](https://arxiv.org/abs/1806.03962), 2018.
