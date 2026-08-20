CREATE TABLE portas (
    id BIGSERIAL PRIMARY KEY,
    ambiente_id BIGINT NOT NULL,
    largura_m NUMERIC(10,2) NOT NULL,
    altura_m NUMERIC(10,2) NOT NULL,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_portas_ambiente
        FOREIGN KEY (ambiente_id)
        REFERENCES ambientes(id)
);