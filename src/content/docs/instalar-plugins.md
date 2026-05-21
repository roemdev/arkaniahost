---
title: "Instalar Plugins (Spigot/Paper)"
description: "Guía paso a paso para añadir nuevas mecánicas a tu servidor instalando plugins."
category: "Gestión del Servidor"
order: 2
---

Los plugins son extensiones que modifican el comportamiento del servidor, añadiendo economías, protecciones, rangos y minijuegos sin necesidad de que los jugadores instalen mods en sus clientes.

Para usar plugins, asegúrate de que tu servidor esté corriendo un software compatible, como **Paper**, **Spigot** o **Purpur**.

## Pasos para instalar un plugin

1. **Descarga el Plugin:** Ve a plataformas oficiales como [SpigotMC](https://www.spigotmc.org/resources/) o Modrinth y descarga el archivo `.jar` del plugin que desees.
2. **Sube el archivo:**
   - Ve a tu Panel de Control de ArkaniaHost.
   - Entra a la pestaña **Files** (Archivos).
   - Abre la carpeta `plugins`.
   - Arrastra el archivo `.jar` desde tu computadora hacia el navegador, o usa el botón "Upload".
3. **Reinicia el servidor:** Vuelve a la pestaña **Console** y presiona "Restart" para aplicar los cambios.

## Verificación

Una vez que el servidor termine de encender, escribe el siguiente comando en la consola:
```bash
plugins
```
Si el plugin aparece en color **verde**, significa que se instaló y activó correctamente. Si aparece en rojo, es probable que te falte alguna dependencia (otro plugin que se requiera para funcionar) o que la versión sea incompatible.
