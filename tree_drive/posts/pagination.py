from rest_framework.pagination import (
    LimitOffsetPagination, PageNumberPagination)
from rest_framework.response import Response


class PostLimittOffsetPagination(LimitOffsetPagination):
    default_limit = 1
    max_limit = 10


class PostPageNumberPagination(PageNumberPagination):
    page_size = 2

    def get_paginated_response(self, data): 
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'pages': {
                'next': self.page.next_page_number() if self.page.has_next() else '',
                'previous': self.page.previous_page_number() if self.page.has_previous() else '',
                'current': self.page.number
            },
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'results': data
        })
