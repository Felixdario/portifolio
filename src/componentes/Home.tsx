import type { Locale } from '@/i18n/tipos';
import { dic, outro, rota } from '@/i18n';
import { CONTATO, CURRICULO, PROJETOS, SPORTLINK } from '@/data/projetos';
import { Topo } from './Topo';
import { Hero } from './Hero';
import { ListaProjetos } from './ListaProjetos';
import { Trabalho } from './Trabalho';
import { ContatoLava } from './ContatoLava';
import { Rodape } from './Rodape';
import styles from './home.module.css';

export function Home({ locale }: { locale: Locale }) {
  const t = dic(locale);
  const itens = PROJETOS.map((p) => ({
    slug: p.slug,
    nome: t.projetos[p.slug].nome,
    fato: t.hero.fatos[p.slug],
    cor: p.cor,
    href: rota.projeto(locale, p.slug),
  }));
  const linhas = PROJETOS.map((p) => {
    const x = t.projetos[p.slug];
    return {
      slug: p.slug,
      cor: p.cor,
      kicker: x.kicker, // taste-skill-ignore: kicker aprovado nas pranchetas
      nome: x.nome,
      numero: x.numero,
      numeroLegenda: x.numeroLegenda,
      frase: x.frase,
      garantia: x.garantia,
      stack: x.stackCurta,
      ressalva: x.ressalva,
      href: rota.projeto(locale, p.slug),
      repo: p.repo,
      aoVivo: p.aoVivo,
      capa: p.capa,
      capaAlt: x.capaAlt,
    };
  });

  return (
    <>
      <a className="pular" href="#conteudo">
        {t.pularParaConteudo}
      </a>
      <Topo locale={locale} outroHref={rota.home(outro(locale))} menu />
      <main id="conteudo">
        <Hero
          nome={t.hero.nome}
          frase={t.hero.frase}
          fraseCurta={t.hero.fraseCurta}
          linkProjetos={t.hero.linkProjetos}
          linkSobre={t.hero.linkSobre}
          listaRotulo={t.hero.listaRotulo}
          itens={itens}
        />

        <section id="projetos" className={styles.secao} aria-labelledby="pj-titulo">
          <div className={styles.cabecalho} data-entra>
            <h2 id="pj-titulo" className="titulo-secao">
              {t.pj.titulo}
            </h2>
            <p className={styles.intro}>{t.pj.intro}</p>
          </div>
          <ListaProjetos linhas={linhas} ver={t.pj.ver} repo={t.pj.repo} aoVivo={t.pj.aoVivo} />
        </section>

        <section id="trabalho" className={styles.secao} aria-labelledby="tb-titulo">
          <div className={styles.cabecalho} data-entra>
            <h2 id="tb-titulo" className="titulo-secao">
              {t.tb.titulo}
            </h2>
            <p className={styles.intro}>{t.tb.intro}</p>
          </div>
          <Trabalho t={t.tb} links={SPORTLINK} />
        </section>

        <section id="sobre" className={styles.secao} aria-labelledby="so-titulo">
          <h2 id="so-titulo" className="titulo-secao">
            {t.so.titulo}
          </h2>
          <div className={styles.soGrade} data-entra>
            <div>
              <p className={styles.soTexto1}>{t.so.texto1}</p>
              <p className={styles.soTexto2}>{t.so.texto2}</p>
              <h3 className={`rotulo ${styles.soRotulo}`}>{t.so.uso}</h3>
              <dl className={styles.soUso}>
                {t.so.usoItens.map(([a, b]) => (
                  <div key={a}>
                    <dt>{a}</dt>
                    <dd>{b}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className={`rotulo ${styles.soRotuloTopo}`}>{t.so.trajetoria}</h3>
              <ol className={styles.soLinha}>
                {t.so.empregos.map(([quando, onde, papel]) => (
                  <li key={quando}>
                    <span>{quando}</span>
                    <span>
                      <strong>{onde}</strong> · {papel}
                    </span>
                  </li>
                ))}
              </ol>
              <h3 className={`rotulo ${styles.soRotulo}`}>{t.so.formacao}</h3>
              <ol className={styles.soLinha}>
                {t.so.cursos.map(([quando, onde, curso]) => (
                  <li key={onde}>
                    <span>{quando}</span>
                    <span>
                      <strong>{onde}</strong> · {curso}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <ContatoLava className={styles.contato}>
          <section id="contato" aria-labelledby="ct-titulo" className={styles.ctDentro}>
            <h2 id="ct-titulo" className="rotulo">
              {t.ct.titulo}
            </h2>
            <a className={styles.ctEmail} href={`mailto:${CONTATO.email}`}>
              {CONTATO.email}
            </a>
            <ul className={styles.ctLinks}>
              <li>
                <a href={CONTATO.github}>{t.ct.github}</a>
              </li>
              <li>
                <a href={CONTATO.linkedin}>{t.ct.linkedin}</a>
              </li>
              {CURRICULO.pt ? (
                <li>
                  <a href={CURRICULO.pt} hrefLang="pt-BR">
                    {t.ct.cvPt}
                  </a>
                </li>
              ) : null}
              {CURRICULO.en ? (
                <li>
                  <a href={CURRICULO.en} hrefLang="en">
                    {t.ct.cvEn}
                  </a>
                </li>
              ) : null}
            </ul>
          </section>
        </ContatoLava>
      </main>
      <Rodape locale={locale} />
    </>
  );
}
