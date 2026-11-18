import type { Locale } from '@/i18n/tipos';
import { dic } from '@/i18n';
import { REPO_DO_SITE } from '@/data/projetos';
import styles from './home.module.css';

export function Rodape({ locale }: { locale: Locale }) {
  const t = dic(locale).rodape;
  return (
    <footer className={styles.rodape}>
      <span>{t.assinatura}</span>
      <span className={styles.rodapeSite}>
        {t.site}
        {REPO_DO_SITE ? (
          <>
            {' '}
            <a href={REPO_DO_SITE}>
              <strong>{t.codigo}</strong>
            </a>
          </>
        ) : null}
      </span>
      <a href="#topo" className={styles.rodapeTopo}>
        {t.topo}
      </a>
    </footer>
  );
}
