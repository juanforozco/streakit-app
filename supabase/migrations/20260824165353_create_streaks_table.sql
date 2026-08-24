/*
# Crear tabla de rachas de hábitos (streaks)

1. Propósito
   La app "StreakIt" no tiene inicio de sesión: cada navegador/dispositivo
   se identifica con un `device_id` generado localmente y guardado en el
   almacenamiento del navegador. Esta tabla guarda, por dispositivo, el
   hábito elegido y el progreso de su racha para que persista entre
   recargas de la página.

2. Nueva tabla `streaks`
   - `id` (uuid, primary key) - identificador de la fila.
   - `device_id` (text, unique, not null) - identificador del dispositivo/navegador.
   - `habit_key` (text, not null) - hábito elegido (ej. "agua", "ejercicio").
   - `current_streak` (integer, not null, default 0) - racha actual en días.
   - `best_streak` (integer, not null, default 0) - mejor racha histórica.
   - `week_start` (date, not null) - fecha del lunes de la semana que reflejan `week_data`.
   - `week_data` (jsonb, not null, default '{}') - mapa de fecha ISO -> estado ("completed" | "missed") para el calendario semanal.
   - `created_at` (timestamptz, default now()).
   - `updated_at` (timestamptz, default now()).

3. Seguridad
   - Se habilita Row Level Security en `streaks`.
   - Como la app no tiene cuentas de usuario, se permite acceso de
     lectura/escritura a los roles `anon` y `authenticated` (los datos
     no son sensibles: solo progreso de hábitos personales de trackeo).
   - Se agregan 4 políticas separadas (select/insert/update/delete).
*/

CREATE TABLE IF NOT EXISTS streaks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id text UNIQUE NOT NULL,
  habit_key text NOT NULL,
  current_streak integer NOT NULL DEFAULT 0,
  best_streak integer NOT NULL DEFAULT 0,
  week_start date NOT NULL,
  week_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_streaks" ON streaks;
CREATE POLICY "anon_select_streaks" ON streaks FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_streaks" ON streaks;
CREATE POLICY "anon_insert_streaks" ON streaks FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_streaks" ON streaks;
CREATE POLICY "anon_update_streaks" ON streaks FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_streaks" ON streaks;
CREATE POLICY "anon_delete_streaks" ON streaks FOR DELETE
  TO anon, authenticated USING (true);
