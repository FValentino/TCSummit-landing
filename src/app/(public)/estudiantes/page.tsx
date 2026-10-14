import { permanentRedirect } from "next/navigation"

/** `/estudiantes` folded into `#educacion` (spec publics-depth; resolved decision 3). The route
 *  stays alive as a permanent redirect so existing links and bookmarks keep working. */
export default function EstudiantesPage() {
  permanentRedirect("/#educacion")
}