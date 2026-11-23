import type { Locale, Slug } from '@/i18n/tipos';
import { dic, outro, rota } from '@/i18n';
import { projeto, proximo } from '@/data/projetos';
import { Topo } from './Topo';
import { Rodape } from './Rodape';
import { Rico } from './Rico';
import { TituloLava } from './TituloLava';
import { DemoSobra } from './demos/Sobra';
import { DemoPontual } from './demos/Pontual';
import { DemoPulo } from './demos/Pulo';
import { DemoConfere } from './demos/Confere';
import styles from './projeto.module.css';

export function PaginaProjeto({ locale, slug }: { locale: Locale; slug: Slug }) {
  const t = dic(locale);
  const d = projeto(slug);
  const x = t.projetos[slug];
  const pg = x.pagina;
  const prox = proximo(slug);
  const demo = { t: pg.demonstracao, titulo: pg.garantiaTitulo, rotulo: t.pagina.garantiaRotulo };

  return (
    <>
      <a className="pular" href="#conteudo">
        {t.pularParaConteudo}
      </a>
      <Topo locale={locale} outroHref={rota.projeto(outro(locale), slug)} voltar={`${rota.home(locale)}#projetos`} />
      <main id="conteudo">
        <header className={styles.cabeca}>
          <TituloLava cor={d.cor} />
          <span className="rotulo">{pg.meta}</span>
          <h1 className={styles.nome}>{x.nome}</h1>
          <div className={styles.cabecaGrade}>
            <p className={styles.resumo}>{pg.resumo}</p>
            <dl className={styles.ficha}>
              <dt>{t.pagina.papelRotulo}</dt>
              <dd>{t.pagina.papel}</dd>
              <dt>{t.pagina.codigoRotulo}</dt>
              <dd>
                <a href={d.repo}>
                  <strong>{d.repo.replace('https://', '')} →</strong>
                </a>
              </dd>
              <dt>{t.pagina.demoRotulo}</dt>
              <dd>
                <a href={d.aoVivo}>
                  <strong>{new URL(d.aoVivo).host} →</strong>
                </a>
                <br />
                {pg.demo}. <span className={styles.aviso}>{t.pagina.demoAviso}</span>
              </dd>
              <dt>{t.pagina.licencaRotulo}</dt>
              <dd>{t.pagina.licenca}</dd>
            </dl>
          </div>
        </header>

        <div className={styles.corpo}>
          {slug === 'sobra' ? <DemoSobra {...demo} locale={locale} /> : null}
          {slug === 'pontual' ? <DemoPontual {...demo} /> : null}
          {slug === 'pulo' ? <DemoPulo {...demo} /> : null}
          {slug === 'confere' ? <DemoConfere {...demo} /> : null}

          <section className={styles.secao} aria-labelledby="como-titulo">
            <span className="rotulo">{t.pagina.comoRotulo}</span>
            <h2 id="como-titulo" className="titulo-medio">
              {pg.comoTitulo}
            </h2>
            <ol className={styles.como}>
              {pg.como.map((c, i) => (
                <li key={i} data-entra>
                  <span className={styles.comoNumero} style={{ background: d.cor }} aria-hidden="true">
                    {i + 1}
                  </span>
                  <p>
                    <Rico texto={c} />
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.secao} aria-labelledby="numeros-titulo">
            <h2 id="numeros-titulo" className="sr">
              {t.pagina.numerosRotulo}
            </h2>
            <ul className={styles.numeros}>
              {pg.numeros.map((n) => (
                <li key={n.valor} data-entra>
                  <strong className={styles.numeroValor}>{n.valor}</strong>
                  <span>
                    <Rico texto={n.texto} />
                  </span>
                </li>
              ))}
            </ul>
            {pg.numerosRessalva ? <p className={styles.ressalva}>{pg.numerosRessalva}</p> : null}
          </section>

          <section className={styles.secao} aria-labelledby="capturas-titulo">
            <h2 id="capturas-titulo" className="sr">
              {t.pagina.capturasRotulo}
            </h2>
            <ul className={styles.capturas}>
              {d.capturas.map((c, i) => (
                <li key={c.arquivo} data-entra data-forma={c.forma}>
                  <img
                    src={c.forma !== 'celular' ? `/img/${c.arquivo}-800.webp` : `/img/${c.arquivo}.webp`}
                    srcSet={c.forma !== 'celular' ? `/img/${c.arquivo}-800.webp 800w, /img/${c.arquivo}.webp 1440w` : undefined}
                    sizes={c.forma !== 'celular' ? '(max-width: 760px) 92vw, 760px' : undefined}
                    width={c.forma !== 'celular' ? 800 : 390}
                    height={c.forma !== 'celular' ? 500 : 844}
                    alt={pg.capturasAlt[i] ?? ''}
                    loading="lazy"
                    decoding="async"
                  />
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.fim} aria-label={t.pagina.naoMedidoRotulo}>
            <div className={styles.fimTexto}>
              <p>
                <Rico texto={pg.naoMedido} />
              </p>
              <p className={styles.stack}>{pg.stack}</p>
            </div>
            <a className={styles.proximo} href={rota.projeto(locale, prox.slug)}>
              <span className={styles.proximoPonto} style={{ background: prox.cor }} aria-hidden="true" />
              {t.pagina.proximo}: {t.projetos[prox.slug].nome} →
            </a>
          </section>
        </div>
      </main>
      <Rodape locale={locale} />
    </>
  );
}
