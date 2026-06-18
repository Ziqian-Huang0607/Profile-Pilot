export const errorMessages = {
  invalid_username: {
    title: 'User not found', titleEs: 'Usuario no encontrado',
    message: "We couldn't find a GitHub user with that username. Please check the spelling and try again.",
    messageEs: 'No pudimos encontrar un usuario de GitHub con ese nombre. Por favor verifica la ortografia e intentalo de nuevo.',
  },
  private_profile: {
    title: 'Profile is private', titleEs: 'Perfil privado',
    message: "This user's profile data is not publicly accessible. Try a different username.",
    messageEs: 'Los datos de este usuario no son publicamente accesibles. Prueba con otro nombre de usuario.',
  },
  api_rate_limit: {
    title: 'Rate limit reached', titleEs: 'Limite de solicitudes alcanzado',
    message: "We've hit GitHub's API rate limit. Please wait a few minutes and try again.",
    messageEs: 'Hemos alcanzado el limite de solicitudes de la API de GitHub. Por favor espera unos minutos e intentalo de nuevo.',
  },
  ai_generation_failed: {
    title: 'Report generation failed', titleEs: 'Error al generar el informe',
    message: "We couldn't generate the AI report. Please try again in a moment.",
    messageEs: 'No pudimos generar el informe con IA. Por favor intentalo de nuevo en un momento.',
  },
  network_error: {
    title: 'Connection error', titleEs: 'Error de conexion',
    message: 'Unable to connect. Please check your internet connection and try again.',
    messageEs: 'No se pudo conectar. Por favor verifica tu conexion a internet e intentalo de nuevo.',
  },
  generic: {
    title: 'Something went wrong', titleEs: 'Algo salio mal',
    message: 'An unexpected error occurred. Please try again.',
    messageEs: 'Ocurrio un error inesperado. Por favor intentalo de nuevo.',
  },
};

export function getErrorMessage(type, locale = 'en') {
  if (!type || typeof type !== 'string') {
    const f = errorMessages.generic;
    return { title: locale === 'es' ? f.titleEs : f.title, message: locale === 'es' ? f.messageEs : f.message };
  }
  const n = type.toLowerCase().trim().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
  const d = errorMessages[n];
  if (d) return { title: locale === 'es' ? d.titleEs : d.title, message: locale === 'es' ? d.messageEs : d.message };
  if (n.includes('not_found') || n.includes('404') || n.includes('user') || n.includes('invalid')) { const e = errorMessages.invalid_username; return { title: locale === 'es' ? e.titleEs : e.title, message: locale === 'es' ? e.messageEs : e.message }; }
  if (n.includes('private') || n.includes('403') || n.includes('forbidden') || n.includes('unauthorized')) { const e = errorMessages.private_profile; return { title: locale === 'es' ? e.titleEs : e.title, message: locale === 'es' ? e.messageEs : e.message }; }
  if (n.includes('rate') || n.includes('429') || n.includes('throttle')) { const e = errorMessages.api_rate_limit; return { title: locale === 'es' ? e.titleEs : e.title, message: locale === 'es' ? e.messageEs : e.message }; }
  if (n.includes('network') || n.includes('connect') || n.includes('timeout') || n.includes('abort') || n.includes('fetch')) { const e = errorMessages.network_error; return { title: locale === 'es' ? e.titleEs : e.title, message: locale === 'es' ? e.messageEs : e.message }; }
  const f = errorMessages.generic;
  return { title: locale === 'es' ? f.titleEs : f.title, message: locale === 'es' ? f.messageEs : f.message };
}

export function classifyError(rawError) {
  if (!rawError || typeof rawError !== 'string') return 'generic';
  const l = rawError.toLowerCase();
  if (l.includes('not found') || l.includes('404') || l.includes("couldn't find") || l.includes('does not exist')) return 'invalid_username';
  if (l.includes('private') || l.includes('403') || l.includes('forbidden') || l.includes('unauthorized')) return 'private_profile';
  if (l.includes('rate limit') || l.includes('429') || l.includes('too many') || l.includes('throttled')) return 'api_rate_limit';
  if (l.includes('network') || l.includes('fetch') || l.includes('connection') || l.includes('timeout') || l.includes('abort') || l.includes('failed to fetch')) return 'network_error';
  if (l.includes('ai') || l.includes('gemini') || l.includes('generation') || l.includes('report') || l.includes('generate')) return 'ai_generation_failed';
  return 'generic';
}
