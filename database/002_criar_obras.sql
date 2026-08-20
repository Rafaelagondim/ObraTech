CREATE TABLE obras (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    cidade VARCHAR(100) NOT NULL,
    estado CHAR(2) NOT NULL,
    area_construida_m2 NUMERIC(10,2),
    data_inicio DATE,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_obras_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
);