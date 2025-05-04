import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // tipo_documento
  const dni = await prisma.tipo_documento.create({
    data: { descripcion: 'DNI' }
  })

  // genero
  const masculino = await prisma.genero.create({
    data: { descripcion: 'Masculino' }
  })

  // alumno
  const alumno1 = await prisma.alumno.create({
    data: {
      nombres: 'Juan',
      apellido_paterno: 'Pérez',
      apellido_materno: 'González',
      id_tipo_documento: dni.id,
      numero_documento: '12345678',
      fecha_nacimiento: new Date('2005-06-15'),
      username: 'juanp',
      password: '1234',
      email: 'juan@example.com',
      id_genero: masculino.id
    }
  })

  // profesor
  const profesor1 = await prisma.profesor.create({
    data: {
      nombres: 'Luis',
      apellidopaterno: 'Martínez',
      apellidomaterno: 'Ramírez',
      idtipodocumento: dni.id,
      numerodocumento: '87654321',
      fechanacimiento: new Date('1980-04-10')
    }
  })

  // curso
  const curso1 = await prisma.curso.create({
    data: {
      nombre: 'Matemática'
    }
  })

  // curso_alumno
  await prisma.curso_alumno.create({
    data: {
      id_alumno: alumno1.id,
      id_curso: curso1.id
    }
  })

  // curso_profesor
  await prisma.curso_profesor.create({
    data: {
      id_curso: curso1.id,
      id_profesor: profesor1.id
    }
  })

  // periodo
  await prisma.periodo.create({
    data: {
      nombre: '2025-I',
      fechainicio: new Date('2025-03-01'),
      fechafin: new Date('2025-07-01')
    }
  })

  // prueba
  const prueba1 = await prisma.prueba.create({
    data: {
      nombre: 'Examen Parcial',
      peso: 30
    }
  })

  // nota
  await prisma.nota.create({
    data: {
      id_alumno: alumno1.id,
      id_curso: curso1.id,
      id_prueba: prueba1.id,
      valor: 14
    }
  })

  // administrativo
  await prisma.admninistrativo.create({
    data: {
      nombres: 'Ana',
      apellidopaterno: 'Ramos',
      apellidomaterno: 'Lopez',
      idtipodocumento: dni.id,
      numerodocumento: '45612378',
      fechanacimiento: new Date('1990-01-01')
    }
  })
}

main()
  .then(() => {
    console.log('Seed completado')
    return prisma.$disconnect()
  })
  .catch((e) => {
    console.error(e)
    return prisma.$disconnect()
  })
