import React, { Component } from 'react';
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { IMG_URL } from "../../utils/constants/url";
import { fetchPerfumes } from "../../actions/perfume-actions";
import "./PerfumeCardsSlider.css";

class PerfumeCardsSlider extends Component {
    componentDidMount() {
        this.props.fetchPerfumes();
    }

    addCarouselItems = (array, counter) => {
        const perfumesId = [39, 56, 119, 59, 47, 95, 89, 98, 52, 40, 92, 99];

        // Lọc danh sách các sản phẩm phù hợp với perfumesId
        const filteredPerfumes = array.filter((perfume) => perfumesId.includes(perfume.id));
        
        // Chia các sản phẩm thành các nhóm 4 sản phẩm cho mỗi Carousel Item
        const groupedPerfumes = [];
        for (let i = counter; i < counter + 4; i++) {
            if (filteredPerfumes[i]) {
                groupedPerfumes.push(filteredPerfumes[i]);
            }
        }

        return (
            <Carousel.Item key={counter}>
                <div className="card-deck">
                    {groupedPerfumes.map((perfume) => (
                        <div className="card" key={perfume.id}>
                            <img
                                className="d-block mx-auto w-50"
                                src={IMG_URL + `${perfume.filename}`}
                                alt={perfume.perfumeTitle} // Thêm alt cho hình ảnh
                            />
                            <div className="card-body text-center">
                                <h5>{perfume.perfumeTitle}</h5>
                                <h6>{perfume.perfumer}</h6>
                                <h6>$<span>{perfume.price}</span>.00</h6>
                                <Link to={`/product/${perfume.id}`}>
                                    <span className="btn btn-dark">
                                        SHOW MORE
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Carousel.Item>
        );
    }

    render() {
        const { perfumes } = this.props;
        const settings = { controls: false };

        // Kiểm tra nếu perfumes có dữ liệu hợp lệ
        if (!perfumes || perfumes.length === 0) {
            return <div>Loading...</div>; // Hoặc có thể hiển thị thông báo lỗi
        }

        return (
            <div>
                <div className="container text-center my-3">
                    <h3>PERSONALLY RECOMMENDED</h3>
                </div>
                <div className="container mt-5" id="indicators">
                    <Carousel {...settings}>
                        {this.addCarouselItems(perfumes, 0)}
                        {this.addCarouselItems(perfumes, 4)}
                        {this.addCarouselItems(perfumes, 8)}
                    </Carousel>
                </div>
            </div>
        );
    }
}

PerfumeCardsSlider.propTypes = {
    fetchPerfumes: PropTypes.func.isRequired,
    perfumes: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    perfumes: state.perfume.perfumes,
});

export default connect(mapStateToProps, { fetchPerfumes })(PerfumeCardsSlider);
