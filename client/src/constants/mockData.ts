import { Evaluation } from '../types/evaluation';

export const MOCK_EVALUATION: Evaluation = {
  id: "1",
  userId: "1",
  projectName: 'QEye - Sistema de Evaluación de Calidad',
  createdAt: new Date(),
  updatedAt: new Date(),
  stages: [
    {
      id: 1,
      name: 'Requerimientos',
      weight: 20,
      items: [
        {
          id: 1,
          name: 'Definición de Especificaciones Funcionales',
          weight: 50,
          criteria: [
            {
              id: 1,
              name: 'Completitud',
              weight: 60,
              score: 4,
              rubric: [
                { id: 1, weight: 5, description: 'Todas las funcionalidades requeridas están documentadas' }
              ]
            },
            {
              id: 2,
              name: 'Claridad',
              weight: 40,
              score: 0,
              rubric: [
                { id: 2, weight: 5, description: 'Las especificaciones son claras y sin ambigüedades' }
              ]
            }
          ]
        },
        {
          id: 2,
          name: 'Definición de Especificaciones de Capacidad',
          weight: 50,
          criteria: [
            {
              id: 3,
              name: 'Rendimiento',
              weight: 100,
              score: 3,
              rubric: [
                { id: 3, weight: 5, description: 'Se definen requisitos de rendimiento y tiempos de respuesta' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Diseño',
      weight: 20,
      items: [
        {
          id: 3,
          name: 'Arquitectura del Sistema',
          weight: 100,
          criteria: [
            {
              id: 4,
              name: 'Modelo de Datos Conceptual',
              weight: 50,
              score: 5,
              rubric: [
                { id: 1, weight: 5, description: 'El modelo conceptual es exhaustivo, preciso y bien documentado, incluyendo la definición detallada de todas las entidades, atributos (con tipos, restricciones, dominios) y relaciones (con cardinalidad y opcionalidad), y se alinea completamente con los requerimientos de datos.' },
                { id: 2, weight: 4, description: 'El modelo conceptual sigue las buenas prácticas de diseño de bases de datos relacionales' },
                { id: 3, weight: 3, description: 'El modelo conceptual es escalable y se puede extender fácilmente' },
                { id: 4, weight: 2, description: 'El modelo conceptual sigue las buenas prácticas de diseño de bases de datos relacionales' },
                { id: 5, weight: 1, description: 'El modelo conceptual sigue las buenas prácticas de diseño de bases de datos relacionales' },

              ]
            },
            {
              id: 5,
              name: 'Escalabilidad',
              weight: 50,
              score: 2,
              rubric: [
                { id: 5, weight: 5, description: 'El diseño considera la escalabilidad futura' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Desarrollo',
      weight: 15,
      items: [
        {
          id: 4,
          name: 'Control de Versiones',
          weight: 100,
          criteria: [
            {
              id: 6,
              name: 'Uso de Git',
              weight: 100,
              score: 4,
              rubric: [
                { id: 6, weight: 5, description: 'Se utiliza Git con buenas prácticas de commits' }
              ]
            }
          ]
        }
      ]
    }
  ]
};
