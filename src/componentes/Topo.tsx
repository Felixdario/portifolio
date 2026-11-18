import type { Locale } from '@/i18n/tipos';
import { dic, outro } from '@/i18n';
import { TemaBotao } from './TemaBotao';
import { Menu } from './Menu';
import styles from './topo.module.css';

type Props = {
  locale: Locale;
  /** Caminho equivalente no outro idioma. */
  outroHref: string;
  voltar?: string;
  menu?: boolean;
};

export function Topo({ locale, outroHref, voltar, menu }: Props) {
  const t = dic(locale);
  const lang = dic(outro(locale)).htmlLang;
  return (
    <header className={styles.topo}>
      {voltar ? (
        <a className={styles.link} href={voltar}>
          {t.pagina.voltar}
        </a>
      ) : (
        <span>{t.lugar}</span>
      )}
      <nav className={styles.acoes} aria-label={t.menu.titulo}>
        <a className={styles.link} href={outroHref} hrefLang={lang} lang={lang} aria-label={t.idioma.nome}>
          {t.idioma.rotulo}
        </a>
        <TemaBotao claro={t.tema.claro} escuro={t.tema.escuro} />
        {menu ? (
          <Menu
            abrir={t.menu.abrir}
            fechar={t.menu.fechar}
            titulo={t.menu.titulo}
            itens={[
              { href: '#projetos', texto: t.nav.projetos },
              { href: '#trabalho', texto: t.nav.trabalho },
              { href: '#sobre', texto: t.nav.sobre },
              { href: '#contato', texto: t.nav.contato },
            ]}
            idioma={{ href: outroHref, texto: t.idioma.rotulo, nome: t.idioma.nome, lang }}
          />
        ) : null}
      </nav>
    </header>
  );
}
