CREATE TABLE ambientes (
    id BIGSERIAL PRIMARY KEY,
    obra_id BIGINT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    largura_m NUMERIC(10,2) NOT NULL,
    comprimento_m NUMERIC(10,2) NOT NULL,
    altura_m NUMERIC(10,2),
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_ambientes_obra
        FOREIGN KEY (obra_id)
        REFERENCES obras(id)
);